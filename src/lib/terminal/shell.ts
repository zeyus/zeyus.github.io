import { cellWidth } from './keys';

export interface ShellIO {
	write(data: string): void;
	cols(): number;
	clear(): void;
}

export interface ShellOptions {
	prompt: string;
	/** Runs a submitted line. The next prompt is shown once it resolves. */
	onLine(line: string): Promise<void> | void;
	/** Completion candidates for the last word of the text before the cursor. */
	complete(before: string): string[];
	history: {
		get(): string[];
		push(line: string): void;
	};
}

// an escape sequence (CSI / SS3 / alt+key) or a single character
// eslint-disable-next-line no-control-regex
const ESCAPE_SEQ = /^\x1b(?:\[[0-9;]*[A-Za-z~]|O[A-Za-z]|[^[O])?/;

/**
 * A small readline-style line editor that runs on top of xterm.js.
 * Handles cursor movement, history, tab completion, paste and wrapped lines.
 */
export class Shell {
	/** Only an active shell shows prompts; the owner deactivates it in serial mode. */
	active = true;

	private chars: string[] = [];
	private cursor = 0;
	// cursor offset (in cells, from the start of the prompt) as last drawn
	private drawn = 0;
	private historyIndex = -1;
	private savedLine = '';
	private queue = '';
	// a command is running
	private busy = false;
	// characters still to be typed by type()
	private typing: string[] | null = null;
	private draining = false;
	private readonly promptWidth: number;

	constructor(
		private io: ShellIO,
		private options: ShellOptions
	) {
		this.promptWidth = cellWidth(options.prompt);
	}

	get line(): string {
		return this.chars.join('');
	}

	// cell offsets from the start of the prompt
	private endOffset(): number {
		return this.promptWidth + cellWidth(this.chars);
	}

	private cursorOffset(): number {
		return this.promptWidth + cellWidth(this.chars.slice(0, this.cursor));
	}

	/** Prints the prompt (and any partially typed line) on a fresh line. */
	prompt() {
		this.io.write(this.options.prompt + this.line);
		this.drawn = this.endOffset();
		// after writing exactly up to the right margin the cursor waits at the last
		// column (pending wrap), so step onto the next row explicitly
		if (this.drawn > 0 && this.drawn % this.io.cols() === 0) {
			this.io.write('\r\n');
		}
		this.moveTo(this.cursorOffset());
	}

	/**
	 * Prints output above the prompt without losing the line being typed,
	 * e.g. for asynchronous messages.
	 */
	printAbove(text: string) {
		if (!this.active || this.busy) {
			this.io.write(text);
			return;
		}
		this.eraseLine();
		this.io.write(text);
		this.prompt();
	}

	/** Input from the terminal (keys, pastes, virtual keys). */
	handleData(data: string) {
		this.queue += data;
		void this.drain();
	}

	/** Simulates typing a line, e.g. for the intro. */
	async type(text: string, delay = 25) {
		const chars = [...text, '\r'];
		this.typing = chars;
		while (this.typing === chars && chars.length) {
			this.handleData(chars.shift()!);
			await new Promise((resolve) => setTimeout(resolve, delay));
		}
		if (this.typing === chars) this.typing = null;
	}

	/** Completes a type() in progress immediately (e.g. when the user starts typing). */
	finishTyping() {
		if (!this.typing) return;
		const rest = this.typing.join('');
		this.typing = null;
		this.handleData(rest);
	}

	/** Runs a whole line as if typed and submitted (compose bar). */
	submit(text: string) {
		this.finishTyping();
		// goes through the queue: ^E ^U clears the current line first
		this.handleData('\x05\x15' + text.replace(/[\r\n]+/g, ' ') + '\r');
	}

	private async drain() {
		if (this.draining) return;
		this.draining = true;
		try {
			while (this.queue.length && this.active) {
				const q = this.queue;
				if (q[0] === '\x1b') {
					const seq = q.match(ESCAPE_SEQ)![0];
					this.queue = q.slice(seq.length);
					this.handleEscape(seq);
					continue;
				}
				// insert runs of printable characters in one go (fast pastes)
				// eslint-disable-next-line no-control-regex
				const run = q.match(/^[^\x00-\x1f\x7f]+/);
				if (run) {
					this.queue = q.slice(run[0].length);
					this.insert(run[0]);
					continue;
				}
				this.queue = q.slice(1);
				await this.handleControl(q[0]);
			}
		} finally {
			this.draining = false;
		}
	}

	private async handleControl(ch: string) {
		switch (ch) {
			case '\r':
			case '\n':
				await this.enter();
				break;
			case '\x7f':
			case '\b':
				if (this.cursor > 0) {
					this.chars.splice(this.cursor - 1, 1);
					this.cursor--;
					this.redraw();
				}
				break;
			case '\x03': // ^C
				this.moveTo(this.endOffset());
				this.io.write('^C\r\n');
				this.reset();
				this.prompt();
				break;
			case '\x04': // ^D
				if (this.chars.length === 0) {
					this.io.write('\r\nnice try, there is no escape.\r\n');
					this.prompt();
				} else {
					this.deleteForward();
				}
				break;
			case '\x0c': // ^L
				this.io.clear();
				this.prompt();
				break;
			case '\x01': // ^A
				this.setCursor(0);
				break;
			case '\x05': // ^E
				this.setCursor(this.chars.length);
				break;
			case '\x15': // ^U
				this.chars.splice(0, this.cursor);
				this.cursor = 0;
				this.redraw();
				break;
			case '\x0b': // ^K
				this.chars.splice(this.cursor);
				this.redraw();
				break;
			case '\x17': // ^W
				this.deleteWordBack();
				break;
			case '\t':
				this.complete();
				break;
			default:
				// ignore other control characters
				break;
		}
	}

	private handleEscape(seq: string) {
		switch (seq) {
			case '\x1b[A':
			case '\x1bOA':
				this.historyStep(1);
				break;
			case '\x1b[B':
			case '\x1bOB':
				this.historyStep(-1);
				break;
			case '\x1b[C':
			case '\x1bOC':
				this.setCursor(this.cursor + 1);
				break;
			case '\x1b[D':
			case '\x1bOD':
				this.setCursor(this.cursor - 1);
				break;
			case '\x1b[H':
			case '\x1bOH':
			case '\x1b[1~':
				this.setCursor(0);
				break;
			case '\x1b[F':
			case '\x1bOF':
			case '\x1b[4~':
				this.setCursor(this.chars.length);
				break;
			case '\x1b[3~':
				this.deleteForward();
				break;
			case '\x1b[1;5C':
			case '\x1bf':
				this.setCursor(this.wordEnd());
				break;
			case '\x1b[1;5D':
			case '\x1bb':
				this.setCursor(this.wordStart());
				break;
			case '\x1b\x7f':
				this.deleteWordBack();
				break;
			default:
				break;
		}
	}

	private async enter() {
		const line = this.line;
		this.moveTo(this.endOffset());
		this.io.write('\r\n');
		this.reset();
		if (line.trim()) {
			this.options.history.push(line);
		}
		this.busy = true;
		try {
			await this.options.onLine(line);
		} catch (error) {
			this.io.write(`\x1b[31m${error instanceof Error ? error.message : error}\x1b[0m\r\n`);
		} finally {
			this.busy = false;
		}
		if (this.active) {
			this.prompt();
		} else {
			// the command handed the terminal over (e.g. to a serial port)
			this.queue = '';
		}
	}

	private reset() {
		this.chars = [];
		this.cursor = 0;
		this.drawn = this.promptWidth;
		this.historyIndex = -1;
		this.savedLine = '';
	}

	private insert(text: string) {
		const add = [...text];
		this.chars.splice(this.cursor, 0, ...add);
		this.cursor += add.length;
		this.redraw();
	}

	private deleteForward() {
		if (this.cursor < this.chars.length) {
			this.chars.splice(this.cursor, 1);
			this.redraw();
		}
	}

	private deleteWordBack() {
		const start = this.wordStart();
		this.chars.splice(start, this.cursor - start);
		this.cursor = start;
		this.redraw();
	}

	private wordStart(): number {
		let i = this.cursor;
		while (i > 0 && this.chars[i - 1] === ' ') i--;
		while (i > 0 && this.chars[i - 1] !== ' ') i--;
		return i;
	}

	private wordEnd(): number {
		let i = this.cursor;
		while (i < this.chars.length && this.chars[i] === ' ') i++;
		while (i < this.chars.length && this.chars[i] !== ' ') i++;
		return i;
	}

	private setCursor(pos: number) {
		this.cursor = Math.max(0, Math.min(this.chars.length, pos));
		this.moveTo(this.cursorOffset());
	}

	private historyStep(dir: 1 | -1) {
		const history = this.options.history.get();
		const next = this.historyIndex + dir;
		if (next < -1 || next >= history.length) return;
		if (this.historyIndex === -1) this.savedLine = this.line;
		this.historyIndex = next;
		const line = next === -1 ? this.savedLine : history[history.length - 1 - next];
		this.chars = [...line];
		this.cursor = this.chars.length;
		this.redraw();
	}

	private complete() {
		const before = this.chars.slice(0, this.cursor).join('');
		const partial = before.split(' ').pop() ?? '';
		const candidates = this.options
			.complete(before)
			.filter((c) => c.startsWith(partial))
			.filter((c, i, all) => all.indexOf(c) === i);
		if (candidates.length === 0) {
			this.io.write('\x07');
			return;
		}
		if (candidates.length === 1) {
			this.insert(candidates[0].slice(partial.length) + ' ');
			return;
		}
		let common = candidates[0];
		for (const c of candidates) {
			while (!c.startsWith(common)) common = common.slice(0, -1);
		}
		if (common.length > partial.length) {
			this.insert(common.slice(partial.length));
			return;
		}
		this.printAbove(candidates.join('  ') + '\r\n');
	}

	/** Erases the prompt and line, leaving the cursor at the start of the prompt row. */
	private eraseLine() {
		const cols = this.io.cols();
		const row = Math.floor(this.drawn / cols);
		this.io.write('\r' + (row > 0 ? `\x1b[${row}A` : '') + '\x1b[J');
		this.drawn = 0;
	}

	private redraw() {
		this.eraseLine();
		this.prompt();
	}

	/** Moves the terminal cursor to a cell offset from the start of the prompt. */
	private moveTo(target: number) {
		const cols = this.io.cols();
		const fromRow = Math.floor(this.drawn / cols);
		const toRow = Math.floor(target / cols);
		const toCol = target % cols;
		let out = '';
		if (toRow < fromRow) out += `\x1b[${fromRow - toRow}A`;
		if (toRow > fromRow) out += `\x1b[${toRow - fromRow}B`;
		out += '\r';
		if (toCol > 0) out += `\x1b[${toCol}C`;
		this.io.write(out);
		this.drawn = target;
	}
}
