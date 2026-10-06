import { createSerial, getPorts, usedSerialPorts, WebSerial } from '#lib/serial2.js';
import type { Profile, SerialConfig } from './settings';

type WebSerialInstance = InstanceType<typeof WebSerial>;
export type Port = NonNullable<WebSerialInstance['port']>;

/**
 * Serial connection state for the terminal, wrapping the WebSerial helper
 * with reactive state for the UI.
 */
export class SerialSession {
	readonly serial = createSerial();
	connected = $state(false);
	connecting = $state(false);
	config = $state<SerialConfig | null>(null);
	portLabel = $state('');
	// null = unknown (we only know what we last set)
	dtr = $state<boolean | null>(null);
	rts = $state<boolean | null>(null);
	lastPort: Port | null = null;

	onBytes: (bytes: Uint8Array) => void = () => {};
	onClosed: (reason: 'user' | 'lost', error?: unknown) => void = () => {};

	private closing = false;
	// bumped per connection, so late callbacks from an old one are ignored
	private generation = 0;

	get supported(): boolean {
		return this.serial !== null;
	}

	/** Ports the user has already granted to this site (usable without the picker). */
	async grantedPorts(): Promise<Port[]> {
		await getPorts();
		return usedSerialPorts();
	}

	label(port: Port | null): string {
		return this.serial?.portLabel(port) ?? 'none';
	}

	/** Finds an already granted port matching a saved profile's USB ids. */
	async findPort(profile: Profile): Promise<Port | null> {
		if (profile.usbVendorId === undefined) return null;
		const ports = await this.grantedPorts();
		return (
			ports.find((p) => {
				const info = p.getInfo();
				return (
					info.usbVendorId === profile.usbVendorId && info.usbProductId === profile.usbProductId
				);
			}) ?? null
		);
	}

	/**
	 * Opens a serial port. If no port is given the browser's port picker is shown
	 * (optionally filtered). Resolves once the port is open.
	 */
	async open(config: SerialConfig, port: Port | null, filters: SerialPortFilter[] = []) {
		const serial = this.serial;
		if (!serial) throw new Error('WebSerial is not supported in this browser');
		if (this.connected) await this.close();

		this.connecting = true;
		try {
			const options: SerialOptions = { ...config };
			if (port) {
				await serial.selectPort(port, options);
			} else {
				await serial.selectPort(filters, options);
			}
			const selected = serial.port;
			if (!selected) throw new Error('No port selected');

			this.closing = false;
			const gen = ++this.generation;
			await new Promise<void>((resolve, reject) => {
				let opened = false;
				serial
					.start(
						null,
						(bytes) => this.onBytes(bytes),
						() => {
							opened = true;
							resolve();
						}
					)
					.then(() => {
						if (!opened) return reject(new Error('Port could not be opened'));
						if (gen !== this.generation) return;
						this.connected = false;
						this.onClosed(this.closing ? 'user' : 'lost');
					})
					.catch((error) => {
						if (!opened) return reject(error);
						if (gen !== this.generation) return;
						this.connected = false;
						this.onClosed('lost', error);
					});
			});

			this.connected = true;
			this.config = config;
			this.lastPort = selected;
			this.portLabel = serial.portLabel(selected);
			this.dtr = null;
			this.rts = null;
		} finally {
			this.connecting = false;
		}
	}

	async close() {
		if (!this.serial || !this.connected) return;
		this.closing = true;
		await this.serial.close();
		this.connected = false;
	}

	async write(data: string | Uint8Array): Promise<boolean> {
		if (!this.serial || !this.connected) return false;
		return this.serial.write(data);
	}

	async setDtr(value: boolean) {
		await this.serial?.dtr(value);
		this.dtr = value;
	}

	async setRts(value: boolean) {
		await this.serial?.rts(value);
		this.rts = value;
	}

	async sendBreak(ms: number) {
		await this.serial?.sendBreak(ms);
	}

	async inputSignals(): Promise<SerialInputSignals | null> {
		return (await this.serial?.signals()) ?? null;
	}

	/** The current connection as a saveable profile. */
	profile(): Profile | null {
		if (!this.config) return null;
		const info = this.lastPort?.getInfo();
		return {
			...this.config,
			usbVendorId: info?.usbVendorId,
			usbProductId: info?.usbProductId
		};
	}
}
