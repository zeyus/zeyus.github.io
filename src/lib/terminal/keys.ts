/**
 * Control characters, escape notation and newline helpers for the terminal.
 */

export type Newline = 'cr' | 'lf' | 'crlf';

export const NEWLINES: Record<Newline, string> = {
	cr: '\r',
	lf: '\n',
	crlf: '\r\n'
};

// characters that map to a control code when combined with Ctrl, e.g. c -> 0x03
const CTRL_CHARS = '@abcdefghijklmnopqrstuvwxyz[\\]^_';

/**
 * Returns the control character for a key, e.g. ctrl('c') === '\x03',
 * or null if the key has no control equivalent.
 */
export function ctrl(key: string): string | null {
	if (key === '?') return '\x7f';
	const i = CTRL_CHARS.indexOf(key.toLowerCase());
	return i === -1 ? null : String.fromCharCode(i);
}

/**
 * Caret notation for a control character, e.g. '\x03' -> '^C'.
 */
export function caret(ch: string): string {
	const code = ch.charCodeAt(0);
	if (code === 0x7f) return '^?';
	if (code < 0x20) return '^' + String.fromCharCode(code + 0x40);
	return ch;
}

const SIMPLE_ESCAPES: Record<string, string> = {
	n: '\n',
	r: '\r',
	t: '\t',
	b: '\b',
	f: '\f',
	v: '\v',
	e: '\x1b',
	a: '\x07',
	'0': '\0',
	'\\': '\\'
};

/**
 * Expands escape notation in a string:
 * \n \r \t \b \f \v \a \e \0 \\, \xHH, \033 (octal), \u{HHHH} and ^X caret notation.
 * A literal caret can be written as \^.
 */
export function unescape(input: string): string {
	let out = '';
	for (let i = 0; i < input.length; i++) {
		const c = input[i];
		if (c === '^' && i + 1 < input.length) {
			const code = ctrl(input[i + 1]);
			if (code !== null) {
				out += code;
				i++;
				continue;
			}
		}
		if (c !== '\\' || i + 1 >= input.length) {
			out += c;
			continue;
		}
		const next = input[i + 1];
		let m: RegExpMatchArray | null;
		if (next === '^') {
			out += '^';
			i++;
		} else if ((m = input.slice(i + 1).match(/^x([0-9a-fA-F]{2})/))) {
			out += String.fromCharCode(parseInt(m[1], 16));
			i += m[0].length;
		} else if ((m = input.slice(i + 1).match(/^u\{([0-9a-fA-F]{1,6})\}/))) {
			out += String.fromCodePoint(parseInt(m[1], 16));
			i += m[0].length;
		} else if ((m = input.slice(i + 1).match(/^0[0-7]{1,3}/)) && m[0].length > 1) {
			out += String.fromCharCode(parseInt(m[0], 8));
			i += m[0].length;
		} else if (next in SIMPLE_ESCAPES) {
			out += SIMPLE_ESCAPES[next];
			i++;
		} else {
			out += next;
			i++;
		}
	}
	return out;
}

/**
 * Parses hex byte notation, e.g. ['03', '0d0a', '0x41'] -> Uint8Array [3, 13, 10, 65].
 * Returns null if anything isn't valid hex.
 */
export function parseHex(args: string[]): Uint8Array | null {
	const digits = args.map((a) => a.replace(/^0x/i, '')).join('');
	if (!digits.length || digits.length % 2 !== 0 || !/^[0-9a-fA-F]+$/.test(digits)) {
		return null;
	}
	const bytes = new Uint8Array(digits.length / 2);
	for (let i = 0; i < bytes.length; i++) {
		bytes[i] = parseInt(digits.slice(i * 2, i * 2 + 2), 16);
	}
	return bytes;
}

/**
 * Formats bytes as a hex dump fragment, breaking the line after each LF.
 */
export function hexDump(bytes: Uint8Array): string {
	let out = '';
	for (const b of bytes) {
		out += b.toString(16).padStart(2, '0') + ' ';
		if (b === 0x0a) out += '\r\n';
	}
	return out;
}

// East Asian wide ranges and emoji, roughly what xterm's unicode11 addon uses
function isWide(cp: number): boolean {
	return (
		(cp >= 0x1100 && cp <= 0x115f) ||
		(cp >= 0x2e80 && cp <= 0xa4cf) ||
		(cp >= 0xac00 && cp <= 0xd7a3) ||
		(cp >= 0xf900 && cp <= 0xfaff) ||
		(cp >= 0xfe30 && cp <= 0xfe4f) ||
		(cp >= 0xff00 && cp <= 0xff60) ||
		(cp >= 0xffe0 && cp <= 0xffe6) ||
		(cp >= 0x1f300 && cp <= 0x1f64f) ||
		(cp >= 0x1f680 && cp <= 0x1f6ff) ||
		(cp >= 0x1f900 && cp <= 0x1f9ff) ||
		(cp >= 0x20000 && cp <= 0x3fffd)
	);
}

function isZeroWidth(cp: number): boolean {
	return (
		(cp >= 0x0300 && cp <= 0x036f) ||
		(cp >= 0x200b && cp <= 0x200f) ||
		(cp >= 0xfe00 && cp <= 0xfe0f)
	);
}

/**
 * Number of terminal cells a string occupies (ANSI escape sequences excluded).
 */
export function cellWidth(s: string | string[]): number {
	// eslint-disable-next-line no-control-regex
	const text = (Array.isArray(s) ? s.join('') : s).replace(/\x1b\[[0-9;]*[A-Za-z]/g, '');
	let width = 0;
	for (const ch of text) {
		const cp = ch.codePointAt(0)!;
		if (!isZeroWidth(cp)) width += isWide(cp) ? 2 : 1;
	}
	return width;
}
