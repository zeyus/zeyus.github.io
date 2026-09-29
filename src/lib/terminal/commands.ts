import { get } from 'svelte/store';
import { unescape, parseHex, NEWLINES, type Newline } from './keys';
import type { SerialSession, Port } from './session.svelte';
import {
	DEFAULT_CONFIG,
	HISTORY_MAX,
	describeConfig,
	history,
	lastProfile,
	prefs,
	profiles,
	type Prefs,
	type Profile,
	type SerialConfig
} from './settings';

export const c = {
	red: (s: string) => `\x1b[31m${s}\x1b[0m`,
	green: (s: string) => `\x1b[32m${s}\x1b[0m`,
	yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
	magenta: (s: string) => `\x1b[35m${s}\x1b[0m`,
	cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
	dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
	bold: (s: string) => `\x1b[1m${s}\x1b[0m`
};

export interface CommandContext {
	println(text?: string): void;
	error(text: string): void;
	clear(): void;
	/** Plain text of the whole scrollback. */
	scrollback(): string;
	session: SerialSession;
	/** Hands the terminal over to the open serial port. */
	enterSerial(): void;
}

export interface Command {
	name: string;
	summary: string;
	usage?: string[];
	/** Candidates for the word being typed; args excludes the command name. */
	complete?(args: string[]): string[];
	/** raw is the line after the command name, with spacing preserved. */
	run(args: string[], ctx: CommandContext, raw: string): void | Promise<void>;
}

const BAUD_RATES = [
	'300',
	'1200',
	'2400',
	'4800',
	'9600',
	'19200',
	'38400',
	'57600',
	'74880',
	'115200',
	'230400',
	'250000',
	'460800',
	'500000',
	'921600',
	'1000000',
	'2000000'
];
const PRESETS = ['Arduino', 'MicroPython', 'RaspberryPi', 'Adafruit'];
const ON_OFF = ['on', 'off'];

const PREF_KEYS: Record<string, { key: keyof Prefs; values: string[]; help: string }> = {
	newline: { key: 'newline', values: ['cr', 'lf', 'crlf'], help: 'what Enter sends to the device' },
	echo: { key: 'echo', values: ON_OFF, help: 'show what you type in serial mode (local echo)' },
	hex: { key: 'hex', values: ON_OFF, help: 'show device output as hex bytes' },
	lfcr: { key: 'lfcr', values: ON_OFF, help: 'treat a bare LF from the device as CRLF' },
	copyonselect: {
		key: 'copyOnSelect',
		values: ON_OFF,
		help: 'copy to the clipboard when selecting text'
	},
	compose: {
		key: 'compose',
		values: ['on', 'off', 'auto'],
		help: 'line input bar below the terminal (auto: on touch devices)'
	}
};

function parseOnOff(v: string | undefined): boolean | null {
	if (v === 'on' || v === 'true' || v === '1') return true;
	if (v === 'off' || v === 'false' || v === '0') return false;
	return null;
}

type OpenArgs = {
	config: SerialConfig;
	portIndex: number | null;
	preset: string | null;
};

/**
 * Parses `[baud] [data] [stop] [parity] [flow]` (or `[baud] 8N1 [flow]`)
 * plus --port N and --filter NAME. Missing values fall back to `base`.
 */
export function parseOpenArgs(args: string[], base: SerialConfig = DEFAULT_CONFIG): OpenArgs {
	const config: SerialConfig = { ...base };
	let portIndex: number | null = null;
	let preset: string | null = null;
	const positional: string[] = [];

	for (let i = 0; i < args.length; i++) {
		const a = args[i];
		if (a === '--port' || a === '-p') {
			portIndex = Number(args[++i]);
			if (!Number.isInteger(portIndex) || portIndex < 0) {
				throw new Error(`invalid port index: ${args[i]} (see "serial list")`);
			}
		} else if (a === '--filter' || a === '-f') {
			const name = args[++i];
			preset = PRESETS.find((p) => p.toLowerCase() === name?.toLowerCase()) ?? null;
			if (!preset) throw new Error(`unknown filter: ${name} (one of ${PRESETS.join(', ')})`);
		} else {
			positional.push(a);
		}
	}

	const frame = (s: string) => s.match(/^([78])([neo])([12])$/i);
	const parity = (s: string): ParityType | null =>
		({ n: 'none', none: 'none', e: 'even', even: 'even', o: 'odd', odd: 'odd' })[
			s.toLowerCase()
		] as ParityType | null;
	const flow = (s: string): FlowControlType | null =>
		({ none: 'none', hw: 'hardware', hardware: 'hardware', rtscts: 'hardware' })[
			s.toLowerCase()
		] as FlowControlType | null;

	let slot = 0; // 0 baud, 1 data bits, 2 stop bits, 3 parity, 4 flow
	for (const p of positional) {
		const f = frame(p);
		if (f) {
			config.dataBits = Number(f[1]) as 7 | 8;
			config.parity = parity(f[2])!;
			config.stopBits = Number(f[3]) as 1 | 2;
			slot = 4;
			continue;
		}
		if (slot === 0) {
			const baud = Number(p);
			if (!Number.isInteger(baud) || baud <= 0) throw new Error(`invalid baud rate: ${p}`);
			config.baudRate = baud;
		} else if (slot === 1) {
			if (p !== '7' && p !== '8') throw new Error(`data bits must be 7 or 8, got ${p}`);
			config.dataBits = Number(p) as 7 | 8;
		} else if (slot === 2) {
			if (p !== '1' && p !== '2') throw new Error(`stop bits must be 1 or 2, got ${p}`);
			config.stopBits = Number(p) as 1 | 2;
		} else if (slot === 3) {
			const v = parity(p);
			if (!v) throw new Error(`parity must be none, even or odd, got ${p}`);
			config.parity = v;
		} else if (slot === 4) {
			const v = flow(p);
			if (!v) throw new Error(`flow control must be none or hardware, got ${p}`);
			config.flowControl = v;
		} else {
			throw new Error(`unexpected argument: ${p}`);
		}
		slot++;
	}
	return { config, portIndex, preset };
}

async function connect(
	ctx: CommandContext,
	config: SerialConfig,
	port: Port | null,
	filters: SerialPortFilter[] = []
) {
	const { session } = ctx;
	if (!port) ctx.println(c.dim('Choose a port in the browser dialog...'));
	await session.open(config, port, filters);
	const profile = session.profile();
	if (profile) lastProfile.set(profile);
	ctx.println(c.green(`Connected to ${session.portLabel} at ${describeConfig(config)}.`));
	ctx.println(
		c.dim(
			'Ctrl+] returns to the shell with the port still open ("fg" to resume), Disconnect closes it.'
		)
	);
	ctx.enterSerial();
}

/** Connects to a profile's port, without the picker if it was granted before. */
async function connectProfile(ctx: CommandContext, profile: Profile, samePort: Port | null = null) {
	const port = samePort ?? (await ctx.session.findPort(profile));
	const filters: SerialPortFilter[] =
		profile.usbVendorId !== undefined
			? [
					profile.usbProductId !== undefined
						? { usbVendorId: profile.usbVendorId, usbProductId: profile.usbProductId }
						: { usbVendorId: profile.usbVendorId }
				]
			: [];
	await connect(ctx, profile, port, filters);
}

function requireSerial(ctx: CommandContext): boolean {
	if (ctx.session.supported) return true;
	ctx.error("Uh, uh uh! You didn't say the magic word!");
	ctx.error(':( Unfortunately serial is not supported in this browser.');
	ctx.error('Try a browser with the Web Serial API or WebUSB (Chrome, Edge or latest Firefox).');
	return false;
}

function requireConnected(ctx: CommandContext): boolean {
	if (ctx.session.connected) return true;
	ctx.error('Not connected. Use "serial open" or "serial r" first.');
	return false;
}

const SERIAL_SUB: Record<
	string,
	{ usage: string; summary: string; run: (args: string[], ctx: CommandContext) => Promise<void> }
> = {
	open: {
		usage: 'serial open [baud] [data] [stop] [parity] [flow] [--port N] [--filter NAME]',
		summary: 'open a port (e.g. "serial open 115200", "serial open 9600 7E1")',
		async run(args, ctx) {
			const { config, portIndex, preset } = parseOpenArgs(args);
			let port: Port | null = null;
			if (portIndex !== null) {
				port = (await ctx.session.grantedPorts())[portIndex] ?? null;
				if (!port) throw new Error(`no granted port ${portIndex} (see "serial list")`);
			}
			const filters = preset ? (ctx.session.serial?.presets[preset] ?? []) : [];
			await connect(ctx, config, port, filters);
		}
	},
	reconnect: {
		usage: 'serial reconnect  (or: serial r)',
		summary: 'reopen the last port with the last settings',
		async run(_args, ctx) {
			const last = get(lastProfile);
			if (!last) throw new Error('nothing to reconnect to yet, use "serial open" first');
			await connectProfile(ctx, last, ctx.session.lastPort);
		}
	},
	baud: {
		usage: 'serial baud <rate>',
		summary: 'reconnect at a different baud rate',
		async run(args, ctx) {
			const last = ctx.session.profile() ?? get(lastProfile);
			if (!last) throw new Error('not connected');
			const { config } = parseOpenArgs(args.slice(0, 1), last);
			await ctx.session.close();
			await connectProfile(ctx, { ...last, ...config }, ctx.session.lastPort);
		}
	},
	save: {
		usage: 'serial save <name> [baud] [data] [stop] [parity] [flow]',
		summary: 'save the current/last connection (or given settings) as a profile',
		async run(args, ctx) {
			const [name, ...rest] = args;
			if (!name) throw new Error('usage: serial save <name>');
			const current = ctx.session.profile() ?? get(lastProfile);
			const profile: Profile = rest.length
				? { ...current, ...parseOpenArgs(rest, current ?? DEFAULT_CONFIG).config }
				: (current ?? { ...DEFAULT_CONFIG });
			profiles.update((p) => ({ ...p, [name]: profile }));
			ctx.println(`Saved profile ${c.cyan(name)}: ${describeConfig(profile)}`);
		}
	},
	connect: {
		usage: 'serial connect <profile>  (or: serial c <profile>)',
		summary: 'connect using a saved profile',
		async run(args, ctx) {
			const profile = get(profiles)[args[0]];
			if (!profile) throw new Error(`no profile "${args[0] ?? ''}" (see "serial profiles")`);
			await connectProfile(ctx, profile);
		}
	},
	profiles: {
		usage: 'serial profiles',
		summary: 'list saved profiles',
		async run(_args, ctx) {
			const all = Object.entries(get(profiles));
			if (!all.length) ctx.println('No profiles yet. Save one with "serial save <name>".');
			for (const [name, p] of all) {
				const ids =
					p.usbVendorId !== undefined
						? c.dim(
								` [${p.usbVendorId.toString(16).padStart(4, '0')}:${(p.usbProductId ?? 0).toString(16).padStart(4, '0')}]`
							)
						: '';
				ctx.println(`  ${c.cyan(name.padEnd(12))} ${describeConfig(p)}${ids}`);
			}
		}
	},
	rm: {
		usage: 'serial rm <profile>',
		summary: 'delete a saved profile',
		async run(args, ctx) {
			const name = args[0];
			if (!name || !(name in get(profiles))) throw new Error(`no profile "${name ?? ''}"`);
			profiles.update((p) => {
				const next = { ...p };
				delete next[name];
				return next;
			});
			ctx.println(`Removed profile ${name}`);
		}
	},
	list: {
		usage: 'serial list',
		summary: 'list ports this site may use without asking',
		async run(_args, ctx) {
			const ports = await ctx.session.grantedPorts();
			if (!ports.length) {
				ctx.println('No ports granted yet. "serial open" asks the browser for one.');
			}
			ports.forEach((p, i) => {
				const current = p === ctx.session.lastPort && ctx.session.connected;
				ctx.println(`  ${i}  ${ctx.session.label(p)}${current ? c.green('  (connected)') : ''}`);
			});
		}
	},
	status: {
		usage: 'serial status',
		summary: 'show connection and signal status',
		async run(_args, ctx) {
			const s = ctx.session;
			if (!s.connected) {
				ctx.println('Not connected.');
				const last = get(lastProfile);
				if (last) ctx.println(c.dim(`Last: ${describeConfig(last)} ("serial r" to reconnect)`));
				return;
			}
			const onOff = (v: boolean | null | undefined) =>
				v === null || v === undefined ? c.dim('?') : v ? c.green('on') : c.dim('off');
			ctx.println(`Port:    ${s.portLabel}`);
			ctx.println(`Config:  ${describeConfig(s.config!)}`);
			ctx.println(`Output:  DTR ${onOff(s.dtr)}  RTS ${onOff(s.rts)}`);
			const input = await s.inputSignals().catch(() => null);
			if (input) {
				ctx.println(
					`Input:   CTS ${onOff(input.clearToSend)}  DSR ${onOff(input.dataSetReady)}  DCD ${onOff(input.dataCarrierDetect)}  RI ${onOff(input.ringIndicator)}`
				);
			}
		}
	},
	dtr: {
		usage: 'serial dtr on|off',
		summary: 'set Data Terminal Ready (often resets Arduino boards)',
		async run(args, ctx) {
			if (!requireConnected(ctx)) return;
			const v = parseOnOff(args[0]) ?? !ctx.session.dtr;
			await ctx.session.setDtr(v);
			ctx.println(`DTR ${v ? 'on' : 'off'}`);
		}
	},
	rts: {
		usage: 'serial rts on|off',
		summary: 'set Request To Send',
		async run(args, ctx) {
			if (!requireConnected(ctx)) return;
			const v = parseOnOff(args[0]) ?? !ctx.session.rts;
			await ctx.session.setRts(v);
			ctx.println(`RTS ${v ? 'on' : 'off'}`);
		}
	},
	break: {
		usage: 'serial break [ms]',
		summary: 'send a break signal (default 250ms)',
		async run(args, ctx) {
			if (!requireConnected(ctx)) return;
			const ms = args[0] ? Number(args[0]) : 250;
			await ctx.session.sendBreak(ms);
			ctx.println(`Sent break (${ms}ms)`);
		}
	},
	close: {
		usage: 'serial close',
		summary: 'close the port',
		async run(_args, ctx) {
			await ctx.session.close();
			ctx.println('Closed serial port');
		}
	},
	forget: {
		usage: 'serial forget',
		summary: 'revoke access to all granted ports',
		async run(_args, ctx) {
			await ctx.session.serial?.forget();
			ctx.session.lastPort = null;
			ctx.println('Serial ports forgotten.');
		}
	}
};

const SERIAL_ALIASES: Record<string, string> = { o: 'open', r: 'reconnect', c: 'connect' };

function sendArgs(raw: string): Uint8Array | string | { breakMs: number } {
	const trimmed = raw.trim();
	const [first, ...rest] = trimmed.split(/\s+/);
	if (first === 'hex') {
		const bytes = parseHex(rest);
		if (!bytes) throw new Error('usage: send hex 03 0d 0a');
		return bytes;
	}
	if (first === 'break') {
		return { breakMs: rest[0] ? Number(rest[0]) : 250 };
	}
	return unescape(trimmed);
}

export function createCommands(): Command[] {
	const commands: Command[] = [
		{
			name: 'help',
			summary: 'list commands, or "help <command>" for details',
			complete: () => commands.map((cmd) => cmd.name),
			run(args, ctx) {
				const cmd = commands.find((x) => x.name === args[0]);
				if (cmd) {
					ctx.println(`${c.bold(cmd.name)} - ${cmd.summary}`);
					for (const u of cmd.usage ?? []) ctx.println('  ' + u);
					return;
				}
				for (const x of commands) {
					ctx.println(`  ${c.cyan(x.name.padEnd(8))} ${x.summary}`);
				}
				ctx.println();
				ctx.println(
					c.dim(
						'Tab completes, ↑/↓ browse history. Select text to copy, right-click or Ctrl+Shift+V to paste.'
					)
				);
			}
		},
		{
			name: 'serial',
			summary: 'talk to serial devices, "serial" for subcommands',
			usage: Object.values(SERIAL_SUB).map((s) => s.usage),
			complete(args) {
				if (args.length <= 1) return Object.keys(SERIAL_SUB);
				const sub = SERIAL_ALIASES[args[0]] ?? args[0];
				const n = args.length - 1; // index of the word being typed
				if (sub === 'connect' || sub === 'rm') return n === 1 ? Object.keys(get(profiles)) : [];
				if (sub === 'dtr' || sub === 'rts') return ON_OFF;
				if (sub === 'baud') return BAUD_RATES;
				if (sub === 'open') {
					if (args[n - 1] === '--filter' || args[n - 1] === '-f') return PRESETS;
					if (n === 1) return BAUD_RATES;
					return ['8N1', '7E1', '8E1', '8O1', 'none', 'hardware', '--port', '--filter'];
				}
				return [];
			},
			async run(args, ctx) {
				if (!requireSerial(ctx)) return;
				const name = SERIAL_ALIASES[args[0]] ?? args[0];
				const sub = SERIAL_SUB[name];
				if (!sub) {
					if (args[0]) ctx.error(`Unknown serial command: ${args[0]}`);
					for (const [n, s] of Object.entries(SERIAL_SUB)) {
						ctx.println(`  ${c.cyan(n.padEnd(10))} ${s.summary}`);
					}
					ctx.println(
						c.dim('  Shortcuts: "serial o" = open, "serial r" = reconnect, "serial c" = connect')
					);
					return;
				}
				try {
					await sub.run(args.slice(1), ctx);
				} catch (error) {
					const msg = error instanceof Error ? error.message : String(error);
					ctx.error(`serial ${name}: ${msg}`);
					if (/already open|Failed to open/i.test(msg)) {
						ctx.error(
							'Is the port open in another program or tab? Try unplugging it and "serial r".'
						);
					}
				}
			}
		},
		{
			name: 'fg',
			summary: 'go back to the open serial port (after Ctrl+])',
			run(_args, ctx) {
				if (!requireConnected(ctx)) return;
				ctx.println(c.dim(`Resuming ${ctx.session.portLabel}...`));
				ctx.enterSerial();
			}
		},
		{
			name: 'send',
			summary: 'send bytes to the device, e.g. send ^C, send \\x03\\r, send hex 03 0d',
			usage: [
				'send <text>      escapes: ^C \\r \\n \\t \\e \\xHH \\033 (use \\^ for a literal ^)',
				'send hex 03 0d   raw bytes',
				'send break [ms]  break signal'
			],
			complete: (args) => (args.length <= 1 ? ['hex', 'break', '^C', '^D', '^Z'] : []),
			async run(_args, ctx, raw) {
				if (!requireSerial(ctx) || !requireConnected(ctx)) return;
				const data = sendArgs(raw);
				if (typeof data === 'object' && 'breakMs' in data) {
					await ctx.session.sendBreak(data.breakMs);
				} else {
					await ctx.session.write(data);
				}
			}
		},
		{
			name: 'set',
			summary: 'terminal settings, "set" to show them',
			usage: Object.entries(PREF_KEYS).map(
				([k, v]) => `set ${k} ${v.values.join('|')}`.padEnd(28) + v.help
			),
			complete(args) {
				if (args.length <= 1) return Object.keys(PREF_KEYS);
				return PREF_KEYS[args[0]]?.values ?? [];
			},
			run(args, ctx) {
				const current = get(prefs);
				if (!args.length) {
					for (const [k, v] of Object.entries(PREF_KEYS)) {
						const val = current[v.key];
						const shown =
							val === null ? 'auto' : typeof val === 'boolean' ? (val ? 'on' : 'off') : String(val);
						ctx.println(`  ${c.cyan(k.padEnd(13))} ${shown.padEnd(5)} ${c.dim(v.help)}`);
					}
					return;
				}
				const def = PREF_KEYS[args[0]];
				if (!def || args.length < 2) {
					ctx.error(`usage: set <${Object.keys(PREF_KEYS).join('|')}> <value>`);
					return;
				}
				let value: Prefs[keyof Prefs];
				if (def.key === 'newline') {
					if (!(args[1] in NEWLINES)) {
						ctx.error('newline must be cr, lf or crlf');
						return;
					}
					value = args[1] as Newline;
				} else if (def.key === 'compose' && args[1] === 'auto') {
					value = null;
				} else {
					const v = parseOnOff(args[1]);
					if (v === null) {
						ctx.error(`${args[0]} must be on or off`);
						return;
					}
					value = v;
				}
				prefs.update((p) => ({ ...p, [def.key]: value }));
				ctx.println(`${args[0]} = ${args[1]}`);
			}
		},
		{
			name: 'echo',
			summary: 'print text, supports escapes like \\e[31m and \\n',
			run(_args, ctx, raw) {
				ctx.println(unescape(raw.trim()).replace(/\r?\n/g, '\r\n'));
			}
		},
		{
			name: 'history',
			summary: 'show command history, "history clear" to empty it',
			complete: () => ['clear'],
			run(args, ctx) {
				if (args[0] === 'clear') {
					history.set([]);
					return;
				}
				get(history).forEach((line, i) =>
					ctx.println(`${c.dim(String(i + 1).padStart(4))}  ${line}`)
				);
			}
		},
		{
			name: 'log',
			summary: 'save the scrollback as a text file ("log save")',
			complete: () => ['save'],
			run(args, ctx) {
				if (args[0] !== 'save') {
					ctx.error('usage: log save');
					return;
				}
				const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
				const blob = new Blob([ctx.scrollback()], { type: 'text/plain' });
				const a = document.createElement('a');
				a.href = URL.createObjectURL(blob);
				a.download = `terminal-${stamp}.txt`;
				a.click();
				setTimeout(() => URL.revokeObjectURL(a.href), 1000);
				ctx.println(`Saved ${a.download}`);
			}
		},
		{
			name: 'clear',
			summary: 'clear the screen (also Ctrl+L)',
			run(_args, ctx) {
				ctx.clear();
			}
		},
		{
			name: 'whoami',
			summary: 'who are you, really?',
			run(_args, ctx) {
				ctx.println('anon');
				ctx.println(c.dim('(or so you would like everyone to think)'));
			}
		},
		{
			name: 'date',
			summary: 'print the current date and time',
			run(_args, ctx) {
				ctx.println(new Date().toString());
			}
		},
		{
			name: 'about',
			summary: 'about this terminal',
			run(_args, ctx) {
				ctx.println(
					`${c.magenta('zeyus serial terminal')} - WebSerial (or WebUSB) in your browser.`
				);
				ctx.println("Built with xterm.js, p5.webserial and Google's web-serial-polyfill.");
				ctx.println(c.dim('Source: https://github.com/zeyus/zeyus.github.io'));
			}
		}
	];
	return commands;
}

/** Splits a line into the command name, its args and the raw remainder. */
export function parseLine(line: string): { name: string; args: string[]; raw: string } {
	const trimmed = line.replace(/^\s+/, '');
	const m = trimmed.match(/^(\S+)\s?(.*)$/);
	if (!m) return { name: '', args: [], raw: '' };
	const raw = m[2];
	const args = raw.trim() ? raw.trim().split(/\s+/) : [];
	return { name: m[1], args, raw };
}

export function completeLine(commands: Command[], before: string): string[] {
	const words = before.replace(/^\s+/, '').split(/\s+/);
	if (words.length <= 1) return commands.map((cmd) => cmd.name);
	const cmd = commands.find((x) => x.name === words[0]);
	return cmd?.complete?.(words.slice(1)) ?? [];
}

export function pushHistory(line: string) {
	history.update((h) => {
		const next = h[h.length - 1] === line ? h : [...h, line];
		return next.slice(-HISTORY_MAX);
	});
}
