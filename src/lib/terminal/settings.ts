import storage from '#lib/store.js';
import type { Newline } from './keys';

export type SerialConfig = {
	baudRate: number;
	dataBits: 7 | 8;
	stopBits: 1 | 2;
	parity: ParityType;
	flowControl: FlowControlType;
};

/** A saved connection: settings plus enough info to find the port again. */
export type Profile = SerialConfig & {
	usbVendorId?: number;
	usbProductId?: number;
};

export const DEFAULT_CONFIG: SerialConfig = {
	baudRate: 9600,
	dataBits: 8,
	stopBits: 1,
	parity: 'none',
	flowControl: 'none'
};

export type WindowMode = 'docked' | 'floating';

export type WindowState = {
	mode: WindowMode;
	maximized: boolean;
	minimized: boolean;
	x: number;
	y: number;
	w: number;
	h: number;
	/** null = auto: tall enough for the intro (see TerminalWindow autoHeight) */
	dockedHeight: number | null;
};

export type Prefs = {
	newline: Newline;
	echo: boolean;
	hex: boolean;
	lfcr: boolean;
	copyOnSelect: boolean;
	/** null = automatic (shown on touch devices) */
	compose: boolean | null;
};

export const WINDOW_DEFAULT: WindowState = {
	mode: 'docked',
	maximized: false,
	minimized: false,
	x: 80,
	y: 80,
	w: 760,
	h: 460,
	dockedHeight: null
};

export const windowState = storage<WindowState>('terminal.window', WINDOW_DEFAULT);

export const prefs = storage<Prefs>('terminal.prefs', {
	newline: 'cr',
	echo: false,
	hex: false,
	lfcr: true,
	copyOnSelect: false,
	compose: null
});

export const history = storage<string[]>('terminal.history', []);
export const HISTORY_MAX = 200;

export const profiles = storage<Record<string, Profile>>('terminal.profiles', {});
export const lastProfile = storage<Profile | null>('terminal.last', null);

/** Short description, e.g. "115200 8N1" (with flow control if any). */
export function describeConfig(c: SerialConfig): string {
	const parity = { none: 'N', even: 'E', odd: 'O' }[c.parity] ?? '?';
	let s = `${c.baudRate} ${c.dataBits}${parity}${c.stopBits}`;
	if (c.flowControl !== 'none') s += ' ' + c.flowControl;
	return s;
}
