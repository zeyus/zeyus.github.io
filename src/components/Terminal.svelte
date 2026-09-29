<script lang="ts">
	import type { Terminal as XTermTerminal } from '@xterm/xterm';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import TerminalWindow from '$components/terminal/TerminalWindow.svelte';
	import XTerm from '$components/terminal/XTerm.svelte';
	import KeyBar from '$components/terminal/KeyBar.svelte';
	import { Shell } from '$lib/terminal/shell';
	import {
		c,
		completeLine,
		createCommands,
		parseLine,
		pushHistory,
		type CommandContext
	} from '$lib/terminal/commands';
	import { SerialSession } from '$lib/terminal/session.svelte';
	import { describeConfig, history, lastProfile, prefs } from '$lib/terminal/settings';
	import { ctrl as ctrlChar, hexDump, NEWLINES } from '$lib/terminal/keys';

	const PROMPT = '\x1b[32manon@zeyus>\x1b[0m ';
	const BANNER = `            __________
         .'----------\`.
         | .--------. |
         | |########| |       __________
         | |########| |      /__________\\
.--------| \`--------' |------|    --=-- |-------------.
|        \`----,-.-----'      |o ======  |             |
|       ______|_|_______     |__________|             |
|      /  %%%%%%%%%%%%  \\                             |
|     /  %%%%%%%%%%%%%%  \\                            |
|     ^^^^^^^^^^^^^^^^^^^^                            |
+-----------------------------------------------------+`;
	const WARNING = `WARNING:  Unauthorized access to this system is
forbidden and will be prosecuted by law. By accessing
this system, you agree that your actions may be
monitored if unauthorized usage is suspected.`;
	const INTRO = 'echo 👋\\x1b[31mHello\\x1b[0m👋\\n🌍\\x1b[32mWorld\\x1b[0m🌍';
	// cap on output kept while detached from an open port (Ctrl+])
	const DETACHED_MAX = 1024 * 1024;

	const session = new SerialSession();
	const commands = createCommands();

	let term = $state.raw<XTermTerminal | null>(null);
	let shell: Shell | null = null;
	let serialMode = $state(false);
	let ctrlSticky = $state(false);
	let coarse = $state(false);
	let composeText = $state('');
	let composeInput = $state<HTMLInputElement>();
	let toast = $state('');
	let toastTimer: ReturnType<typeof setTimeout> | undefined;
	let detached: Uint8Array[] = [];
	let detachedBytes = 0;

	let showCompose = $derived($prefs.compose ?? coarse);
	let showKeyBar = $derived(serialMode || coarse || showCompose);
	let title = $derived(
		session.connected && session.config
			? `⚡ ${session.portLabel} · ${describeConfig(session.config)}${serialMode ? '' : ' (detached)'}`
			: 'anon@zeyus: ~/terminal'
	);

	const nl = (s: string) => s.replace(/\r?\n/g, '\r\n');

	function flash(message: string) {
		toast = message;
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => (toast = ''), 1800);
	}

	const ctx: CommandContext = {
		println: (text = '') => term?.write(text + '\r\n'),
		error: (text) => term?.write(c.red(text) + '\r\n'),
		clear: () => term?.write('\x1b[H\x1b[2J\x1b[3J'),
		scrollback() {
			if (!term) return '';
			const buffer = term.buffer.active;
			const lines: string[] = [];
			for (let i = 0; i < buffer.length; i++) {
				const line = buffer.getLine(i);
				if (!line) continue;
				// join soft-wrapped rows back into one line
				const text = line.translateToString(true);
				if (line.isWrapped && lines.length) lines[lines.length - 1] += text;
				else lines.push(text);
			}
			return lines.join('\n').trimEnd() + '\n';
		},
		session,
		enterSerial
	};

	async function runLine(line: string) {
		const { name, args, raw } = parseLine(line);
		if (!name) return;
		const cmd = commands.find((x) => x.name === name);
		if (!cmd) {
			ctx.error(`Unknown command: ${name} (try "help")`);
			return;
		}
		await cmd.run(args, ctx, raw);
	}

	function enterSerial() {
		if (!term || !shell) return;
		serialMode = true;
		shell.active = false;
		for (const chunk of detached) writeDevice(chunk);
		detached = [];
		detachedBytes = 0;
		term.focus();
	}

	function detach() {
		if (!term || !shell) return;
		serialMode = false;
		shell.active = true;
		term.write(
			'\r\n' +
				c.dim('[detached, the port is still open: "fg" resumes, "serial close" disconnects]') +
				'\r\n'
		);
		shell.prompt();
	}

	async function disconnect() {
		await session.close();
	}

	function onClosed(reason: 'user' | 'lost', error?: unknown) {
		const wasAttached = serialMode;
		serialMode = false;
		detached = [];
		detachedBytes = 0;
		let message = '';
		if (reason === 'lost') {
			const detail = error instanceof Error ? `: ${error.message}` : '';
			message = c.red(`Connection lost${detail}.`) + c.dim(' "serial r" reconnects.');
		}
		if (!shell) return;
		if (wasAttached) {
			shell.active = true;
			term?.write('\r\n' + (message || c.dim('Serial port closed.')) + '\r\n');
			shell.prompt();
		} else if (message) {
			shell.printAbove(message + '\r\n');
		}
	}

	function writeDevice(bytes: Uint8Array) {
		term?.write(get(prefs).hex ? hexDump(bytes) : bytes);
	}

	function onBytes(bytes: Uint8Array) {
		if (serialMode) {
			writeDevice(bytes);
			return;
		}
		// detached: keep the newest output for when we resume
		detached.push(bytes);
		detachedBytes += bytes.length;
		while (detachedBytes > DETACHED_MAX && detached.length > 1) {
			detachedBytes -= detached.shift()!.length;
		}
	}

	function sendSerial(data: string) {
		if (data === '\x1d') {
			// Ctrl+], like telnet's escape character
			detach();
			return;
		}
		const p = get(prefs);
		if (p.echo) term?.write(data.replace(/\r/g, '\r\n'));
		session.write(data.replace(/\r/g, NEWLINES[p.newline])).catch((error) => {
			term?.write('\r\n' + c.red(`write failed: ${error?.message ?? error}`) + '\r\n');
		});
	}

	/** Routes input to the device or the local shell. */
	function input(data: string) {
		if (serialMode) {
			sendSerial(data);
		} else if (shell) {
			shell.finishTyping();
			shell.handleData(data);
		}
	}

	function onData(data: string) {
		if (ctrlSticky && data.length === 1) {
			ctrlSticky = false;
			data = ctrlChar(data) ?? data;
		}
		input(data);
	}

	function virtualKey(key: string) {
		const arrows: Record<string, string> = { up: 'A', down: 'B', right: 'C', left: 'D' };
		if (key in arrows) {
			// full-screen programs on the device may switch to application cursor keys
			const prefix = term?.modes.applicationCursorKeysMode ? '\x1bO' : '\x1b[';
			key = prefix + arrows[key];
		}
		input(key);
	}

	async function copy() {
		const text = term?.getSelection();
		if (!text) {
			flash('nothing selected');
			return;
		}
		try {
			await navigator.clipboard.writeText(text);
			flash('copied');
		} catch {
			flash('clipboard blocked');
		}
	}

	async function paste() {
		try {
			const text = await navigator.clipboard.readText();
			if (text) term?.paste(text);
		} catch {
			flash('clipboard blocked, try Ctrl+V');
		}
	}

	const isMac = () => /Mac|iPhone|iPad/.test(navigator.platform);

	// returning false stops xterm handling the key
	function onKey(e: KeyboardEvent): boolean {
		if (e.type !== 'keydown' || !term) return true;
		const key = e.key.toLowerCase();
		const mod = e.ctrlKey || e.metaKey;
		if (mod && !e.altKey && key === 'c' && (e.shiftKey || term.hasSelection())) {
			e.preventDefault();
			void copy();
			return false;
		}
		if (e.ctrlKey && e.shiftKey && key === 'v') {
			e.preventDefault();
			void paste();
			return false;
		}
		// let the browser fire a native paste event, which xterm picks up
		if ((e.metaKey || (e.ctrlKey && !isMac())) && key === 'v') {
			return false;
		}
		return true;
	}

	function onContextMenu(e: MouseEvent) {
		// shift+right-click (and touch devices) keep the browser menu
		if (!term || coarse || e.shiftKey) return;
		e.preventDefault();
		if (term.hasSelection()) {
			void copy();
			term.clearSelection();
		} else {
			void paste();
		}
	}

	function submitCompose(e: SubmitEvent) {
		e.preventDefault();
		const text = composeText;
		composeText = '';
		if (ctrlSticky && [...text].length === 1) {
			ctrlSticky = false;
			const code = ctrlChar(text);
			if (code) {
				input(code);
				return;
			}
		}
		if (serialMode) sendSerial(text + '\r');
		else shell?.submit(text);
		composeInput?.focus();
	}

	function toggleCompose() {
		prefs.update((p) => ({ ...p, compose: !showCompose }));
	}

	async function toggleSignal(which: 'dtr' | 'rts') {
		try {
			if (which === 'dtr') await session.setDtr(!session.dtr);
			else await session.setRts(!session.rts);
			flash(`${which} ${session[which] ? 'on' : 'off'}`);
		} catch (error) {
			flash(`${which} failed: ${error instanceof Error ? error.message : error}`);
		}
	}

	async function sendBreak() {
		try {
			await session.sendBreak(250);
			flash('break sent');
		} catch (error) {
			flash(`break failed: ${error instanceof Error ? error.message : error}`);
		}
	}

	function reconnect() {
		term?.focus();
		shell?.submit('serial r');
	}

	function ready(t: XTermTerminal) {
		term = t;
		t.options.convertEol = get(prefs).lfcr;
		shell = new Shell(
			{
				write: (s) => t.write(s),
				cols: () => t.cols,
				clear: ctx.clear
			},
			{
				prompt: PROMPT,
				onLine: runLine,
				complete: (before) => completeLine(commands, before),
				history: { get: () => get(history), push: pushHistory }
			}
		);
		t.onData(onData);
		t.attachCustomKeyEventHandler(onKey);
		t.onSelectionChange(() => {
			if (get(prefs).copyOnSelect && t.hasSelection()) void copy();
		});
		session.onBytes = onBytes;
		session.onClosed = onClosed;

		t.write(nl(BANNER) + '\r\n\r\n' + nl(WARNING) + '\r\n\r\n');
		t.write('Type "help" for a list of commands.\r\n\r\n');
		shell.prompt();
		void shell.type(INTRO);
		// don't pop up the on-screen keyboard on page load
		if (!coarse) t.focus();
	}

	$effect(() => {
		const lfcr = $prefs.lfcr;
		if (term) term.options.convertEol = lfcr;
	});

	onMount(() => {
		coarse = window.matchMedia('(pointer: coarse)').matches;
		return () => {
			clearTimeout(toastTimer);
			void session.close();
		};
	});
</script>

<TerminalWindow {title}>
	{#snippet actions()}
		{#if toast}
			<span class="toast" role="status">{toast}</span>
		{/if}
		{#if term}
			{#if session.connecting}
				<span class="status">connecting…</span>
			{:else if session.connected}
				<button type="button" class="tb-btn" onclick={disconnect}>⏏ disconnect</button>
			{:else if $lastProfile && session.supported}
				<button
					type="button"
					class="tb-btn"
					title="Reconnect: {describeConfig($lastProfile)}"
					onclick={reconnect}>↻ reconnect</button
				>
			{/if}
		{/if}
	{/snippet}

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="screen" oncontextmenu={onContextMenu}>
		<XTerm onready={ready} />
	</div>
	{#if term && showKeyBar}
		<KeyBar
			serial={serialMode}
			bind:ctrl={ctrlSticky}
			dtr={session.dtr}
			rts={session.rts}
			compose={showCompose}
			onkey={virtualKey}
			onbreak={sendBreak}
			ondtr={() => toggleSignal('dtr')}
			onrts={() => toggleSignal('rts')}
			ondetach={detach}
			ondisconnect={disconnect}
			oncopy={copy}
			onpaste={paste}
			onselectall={() => term?.selectAll()}
			oncompose={toggleCompose}
		/>
	{/if}
	{#if term && showCompose}
		<form class="compose" onsubmit={submitCompose}>
			<span class="compose-prompt">{serialMode ? '⚡' : '>'}</span>
			<input
				bind:this={composeInput}
				bind:value={composeText}
				type="text"
				name="line"
				aria-label={serialMode ? 'Line to send to the device' : 'Command'}
				placeholder={serialMode ? 'send a line to the device…' : 'type a command…'}
				autocomplete="off"
				autocapitalize="off"
				spellcheck="false"
				enterkeyhint="send"
			/>
			<button type="submit">send</button>
		</form>
	{/if}
</TerminalWindow>
{#if !showKeyBar && term}
	<p class="hint">
		Tip: <code>serial open 115200</code> to connect, Ctrl+] detaches, <code>help</code> for more. Select
		to copy, right-click to paste.
	</p>
{/if}

<style>
	.screen {
		display: flex;
		flex: 1 1 auto;
		min-height: 0;
		background: #050507;
	}
	.toast,
	.status {
		font-size: 0.7rem;
		color: var(--color-accent-strong);
	}
	.compose {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.35rem 0.5rem;
		background: var(--color-surface-2);
		border-top: 1px solid var(--color-line);
	}
	.compose-prompt {
		color: var(--color-accent);
		font-size: 0.85rem;
	}
	.compose input {
		flex: 1;
		min-width: 0;
		padding: 0.3rem 0.5rem;
		border: 1px solid var(--color-line);
		border-radius: 0.25rem;
		background: var(--color-surface);
		color: var(--color-fg);
		font-family: var(--font-mono);
		/* 16px avoids iOS zooming into the field */
		font-size: 16px;
	}
	.compose input:focus {
		outline: none;
		border-color: var(--color-accent);
	}
	.compose button {
		padding: 0.3rem 0.7rem;
		border-radius: 0.25rem;
		background: var(--color-accent);
		color: #fff;
		font-size: 0.8rem;
		cursor: pointer;
	}
	.hint {
		margin: 0.5rem 0 0;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-fg-subtle);
	}
</style>
