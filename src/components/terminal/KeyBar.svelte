<script lang="ts">
	let {
		serial,
		ctrl = $bindable(false),
		dtr,
		rts,
		compose,
		onkey,
		onbreak,
		ondtr,
		onrts,
		ondetach,
		ondisconnect,
		oncopy,
		onpaste,
		onselectall,
		oncompose
	}: {
		/** in serial mode (vs the local shell) */
		serial: boolean;
		ctrl?: boolean;
		dtr: boolean | null;
		rts: boolean | null;
		compose: boolean;
		/** a key sequence, e.g. '\x1b' or 'up' */
		onkey: (key: string) => void;
		onbreak: () => void;
		ondtr: () => void;
		onrts: () => void;
		ondetach: () => void;
		ondisconnect: () => void;
		oncopy: () => void;
		onpaste: () => void;
		onselectall: () => void;
		oncompose: () => void;
	} = $props();

	const keys: { label: string; key: string; title: string }[] = [
		{ label: 'esc', key: '\x1b', title: 'Escape' },
		{ label: 'tab', key: '\t', title: 'Tab' },
		{ label: '↑', key: 'up', title: 'Up' },
		{ label: '↓', key: 'down', title: 'Down' },
		{ label: '←', key: 'left', title: 'Left' },
		{ label: '→', key: 'right', title: 'Right' },
		{ label: '^C', key: '\x03', title: 'Ctrl+C (interrupt)' },
		{ label: '^D', key: '\x04', title: 'Ctrl+D (end of input / soft reset)' },
		{ label: '^Z', key: '\x1a', title: 'Ctrl+Z (suspend)' }
	];

	const onOff = (v: boolean | null) => (v === null ? '?' : v ? 'on' : 'off');

	// keep focus where it is (the terminal or the compose input), so the
	// on-screen keyboard doesn't close when a key is tapped
	const keepFocus = (e: PointerEvent) => e.preventDefault();
</script>

<div class="keybar" role="toolbar" aria-label="Special keys">
	<button
		type="button"
		class:active={ctrl}
		aria-pressed={ctrl}
		title="Sticky Ctrl: the next key you type is sent as a control character"
		onpointerdown={keepFocus}
		onclick={() => (ctrl = !ctrl)}>ctrl</button
	>
	{#each keys as k (k.label)}
		<button type="button" title={k.title} onpointerdown={keepFocus} onclick={() => onkey(k.key)}
			>{k.label}</button
		>
	{/each}
	{#if serial}
		<span class="sep"></span>
		<button
			type="button"
			title="Send a 250ms break signal"
			onpointerdown={keepFocus}
			onclick={onbreak}>break</button
		>
		<button
			type="button"
			class:active={dtr === true}
			title="Toggle Data Terminal Ready (currently {onOff(dtr)})"
			onpointerdown={keepFocus}
			onclick={ondtr}>dtr</button
		>
		<button
			type="button"
			class:active={rts === true}
			title="Toggle Request To Send (currently {onOff(rts)})"
			onpointerdown={keepFocus}
			onclick={onrts}>rts</button
		>
		<button
			type="button"
			title="Back to the shell, port stays open (Ctrl+])"
			onpointerdown={keepFocus}
			onclick={ondetach}>^] shell</button
		>
		<button type="button" class="danger" title="Close the serial port" onclick={ondisconnect}
			>disconnect</button
		>
	{/if}
	<span class="sep"></span>
	<button type="button" title="Copy the selection" onpointerdown={keepFocus} onclick={oncopy}
		>copy</button
	>
	<button type="button" title="Paste from the clipboard" onpointerdown={keepFocus} onclick={onpaste}
		>paste</button
	>
	<button type="button" title="Select everything" onpointerdown={keepFocus} onclick={onselectall}
		>select all</button
	>
	<button
		type="button"
		class:active={compose}
		aria-pressed={compose}
		title="Line input bar (handy on mobile)"
		onclick={oncompose}>⌨ line</button
	>
</div>

<style>
	.keybar {
		display: flex;
		gap: 0.3rem;
		padding: 0.35rem 0.5rem;
		overflow-x: auto;
		scrollbar-width: none;
		background: var(--color-surface-3);
		border-top: 1px solid var(--color-line);
		font-family: var(--font-mono);
	}
	button {
		flex: 0 0 auto;
		min-width: 2.2rem;
		padding: 0.15rem 0.5rem;
		border: 1px solid var(--color-line);
		border-radius: 0.25rem;
		background: var(--color-surface);
		color: var(--color-fg);
		font-size: 0.75rem;
		line-height: 1.4rem;
		cursor: pointer;
		touch-action: manipulation;
	}
	button:hover {
		border-color: var(--color-accent);
		color: var(--color-accent-strong);
	}
	button.active {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: #fff;
	}
	button.danger:hover {
		border-color: #ef4444;
		color: #ef4444;
	}
	.sep {
		flex: 0 0 1px;
		margin: 0.15rem 0.2rem;
		background: var(--color-line);
	}
</style>
