<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { get } from 'svelte/store';
	import { WINDOW_DEFAULT, windowState, type WindowState } from '$lib/terminal/settings';

	let {
		title,
		actions,
		children
	}: {
		title: string;
		actions?: Snippet;
		children: Snippet;
	} = $props();

	const MIN_W = 360;
	const MIN_H = 220;
	const EDGES = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'] as const;

	// the saved state is applied on mount so the prerendered markup matches hydration
	let win: WindowState = $state({ ...WINDOW_DEFAULT });
	// floating needs room; below md the terminal is always inline
	let wide = $state(false);
	let frame: HTMLDivElement;
	let viewport = $state({ top: 0, height: 0 });

	let floating = $derived(wide && win.mode === 'floating');

	// window actions shouldn't leave the terminal without keyboard focus
	// (except on touch devices, where focusing pops up the keyboard)
	const refocus = () => {
		if (matchMedia('(pointer: coarse)').matches) return;
		requestAnimationFrame(() => frame.querySelector<HTMLElement>('.xterm textarea')?.focus());
	};

	const save = () => {
		windowState.set($state.snapshot(win));
		refocus();
	};
	const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

	function keepOnScreen() {
		win.w = clamp(win.w, MIN_W, innerWidth);
		win.h = clamp(win.h, MIN_H, innerHeight);
		win.x = clamp(win.x, 0, Math.max(0, innerWidth - 120));
		win.y = clamp(win.y, 0, Math.max(0, innerHeight - 40));
	}

	function popOut() {
		const rect = frame.getBoundingClientRect();
		win.x = rect.left;
		win.y = Math.max(rect.top, 0);
		win.w = rect.width;
		win.h = Math.min(rect.height, innerHeight - 40);
		win.mode = 'floating';
		win.maximized = false;
		win.minimized = false;
		keepOnScreen();
		save();
	}

	function dock() {
		win.mode = 'docked';
		win.maximized = false;
		win.minimized = false;
		save();
	}

	function toggleMaximize() {
		win.maximized = !win.maximized;
		win.minimized = false;
		save();
	}

	function toggleMinimize() {
		win.minimized = !win.minimized;
		if (win.minimized) win.maximized = false;
		save();
	}

	// drag with pointer capture: fn(dx, dy) gets the offset from the start
	function track(e: PointerEvent, fn: (dx: number, dy: number) => void) {
		if (e.button !== 0) return;
		e.preventDefault();
		const target = e.currentTarget as HTMLElement;
		target.setPointerCapture(e.pointerId);
		const sx = e.clientX;
		const sy = e.clientY;
		const move = (ev: PointerEvent) => fn(ev.clientX - sx, ev.clientY - sy);
		const up = () => {
			target.removeEventListener('pointermove', move);
			target.removeEventListener('pointerup', up);
			target.removeEventListener('pointercancel', up);
			save();
		};
		target.addEventListener('pointermove', move);
		target.addEventListener('pointerup', up);
		target.addEventListener('pointercancel', up);
	}

	function startDrag(e: PointerEvent) {
		if (!floating || win.maximized) return;
		if ((e.target as HTMLElement).closest('button, a, input')) return;
		const { x, y } = win;
		track(e, (dx, dy) => {
			win.x = clamp(x + dx, 0, innerWidth - 120);
			win.y = clamp(y + dy, 0, innerHeight - 40);
		});
	}

	function startResize(e: PointerEvent, edge: (typeof EDGES)[number]) {
		const start = { ...win };
		track(e, (dx, dy) => {
			if (!floating) {
				win.dockedHeight = clamp(start.dockedHeight + dy, MIN_H, innerHeight * 0.9);
				return;
			}
			if (edge.includes('e')) win.w = clamp(start.w + dx, MIN_W, innerWidth - start.x);
			if (edge.includes('s')) win.h = clamp(start.h + dy, MIN_H, innerHeight - start.y);
			if (edge.includes('w')) {
				const w = clamp(start.w - dx, MIN_W, start.x + start.w);
				win.x = start.x + start.w - w;
				win.w = w;
			}
			if (edge.includes('n')) {
				const h = clamp(start.h - dy, MIN_H, start.y + start.h);
				win.y = start.y + start.h - h;
				win.h = h;
			}
		});
	}

	let style = $derived.by(() => {
		if (win.maximized) {
			// follow the visual viewport so the on-screen keyboard doesn't cover it
			return viewport.height
				? `top:${viewport.top}px;height:${viewport.height}px`
				: 'top:0;height:100dvh';
		}
		if (floating) {
			return `left:${win.x}px;top:${win.y}px;width:${win.w}px;height:${win.minimized ? 'auto' : win.h + 'px'}`;
		}
		return win.minimized ? '' : `height:${win.dockedHeight}px`;
	});

	onMount(() => {
		win = { ...WINDOW_DEFAULT, ...get(windowState) };
		const mq = window.matchMedia('(min-width: 768px)');
		const onMq = () => (wide = mq.matches);
		onMq();
		mq.addEventListener('change', onMq);

		const onResize = () => {
			keepOnScreen();
			const vv = window.visualViewport;
			if (vv) viewport = { top: vv.offsetTop, height: vv.height };
		};
		onResize();
		window.addEventListener('resize', onResize);
		window.visualViewport?.addEventListener('resize', onResize);
		window.visualViewport?.addEventListener('scroll', onResize);

		return () => {
			mq.removeEventListener('change', onMq);
			window.removeEventListener('resize', onResize);
			window.visualViewport?.removeEventListener('resize', onResize);
			window.visualViewport?.removeEventListener('scroll', onResize);
		};
	});
</script>

{#if floating && !win.maximized}
	<div class="dock-placeholder">
		<span>terminal is floating</span>
		<button type="button" onclick={dock}>[dock it here]</button>
	</div>
{/if}

<div
	bind:this={frame}
	class="term-window"
	class:floating
	class:maximized={win.maximized}
	class:minimized={win.minimized}
	{style}
	role="region"
	aria-label="Terminal window"
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="titlebar" onpointerdown={startDrag} ondblclick={toggleMaximize}>
		<div class="lights">
			<button
				type="button"
				class="light red"
				title="Dock / restore"
				aria-label="Dock or restore the terminal"
				disabled={!floating && !win.maximized && !win.minimized}
				onclick={dock}
			></button>
			<button
				type="button"
				class="light yellow"
				title={win.minimized ? 'Restore' : 'Minimise'}
				aria-label={win.minimized ? 'Restore the terminal' : 'Minimise the terminal'}
				onclick={toggleMinimize}
			></button>
			<button
				type="button"
				class="light green"
				title={win.maximized ? 'Restore size' : 'Maximise'}
				aria-label={win.maximized ? 'Restore the terminal size' : 'Maximise the terminal'}
				onclick={toggleMaximize}
			></button>
		</div>
		<div class="title">{title}</div>
		<div class="actions">
			{@render actions?.()}
			{#if wide && !floating && !win.maximized}
				<button type="button" class="tb-btn" title="Pop out into a floating window" onclick={popOut}
					>⧉ pop out</button
				>
			{:else if floating && !win.maximized}
				<button
					type="button"
					class="tb-btn"
					title="Put the terminal back in the page"
					onclick={dock}>⤓ dock</button
				>
			{/if}
		</div>
	</div>

	<div class="body" hidden={win.minimized}>
		{@render children()}
	</div>

	{#if !win.maximized && !win.minimized}
		{#if floating}
			{#each EDGES as edge (edge)}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="grip grip-{edge}" onpointerdown={(e) => startResize(e, edge)}></div>
			{/each}
		{:else}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="grip grip-s docked-grip"
				title="Drag to resize"
				onpointerdown={(e) => startResize(e, 's')}
			></div>
		{/if}
	{/if}
</div>

<style>
	.term-window {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 0;
		border: 1px solid var(--color-line);
		border-radius: 0.5rem;
		background: var(--color-surface-2);
		box-shadow:
			0 0 0 1px color-mix(in oklab, var(--color-accent) 25%, transparent),
			0 0 24px var(--color-glow);
		overflow: hidden;
		font-family: var(--font-mono);
	}
	.term-window.floating {
		position: fixed;
		z-index: 60;
		box-shadow:
			0 0 0 1px color-mix(in oklab, var(--color-accent) 40%, transparent),
			0 18px 50px rgb(0 0 0 / 0.45),
			0 0 32px var(--color-glow);
	}
	.term-window.maximized {
		position: fixed;
		z-index: 70;
		left: 0;
		width: 100vw;
		border-radius: 0;
	}
	.term-window.minimized {
		height: auto;
	}

	.titlebar {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.3rem 0.6rem;
		background: var(--color-surface-3);
		border-bottom: 1px solid var(--color-line);
		user-select: none;
		touch-action: none;
		font-size: 0.75rem;
		color: var(--color-fg-muted);
	}
	.floating:not(.maximized) .titlebar {
		cursor: grab;
	}
	.lights {
		display: flex;
		gap: 0.4rem;
	}
	.light {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		border: 1px solid rgb(0 0 0 / 0.25);
		cursor: pointer;
	}
	.light:disabled {
		opacity: 0.35;
		cursor: default;
	}
	.light.red {
		background: #ff5f57;
	}
	.light.yellow {
		background: #febc2e;
	}
	.light.green {
		background: #28c840;
	}
	.title {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
		color: var(--color-fg);
	}
	.actions {
		display: flex;
		gap: 0.4rem;
		align-items: center;
	}
	.actions :global(.tb-btn) {
		padding: 0 0.4rem;
		border: 1px solid var(--color-line);
		border-radius: 0.25rem;
		background: var(--color-surface);
		color: var(--color-fg-muted);
		font-size: 0.7rem;
		line-height: 1.3rem;
		white-space: nowrap;
		cursor: pointer;
	}
	.actions :global(.tb-btn:hover) {
		color: var(--color-accent-strong);
		border-color: var(--color-accent);
	}

	.body {
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
		min-height: 0;
	}
	.body[hidden] {
		display: none;
	}

	.grip {
		position: absolute;
		z-index: 2;
		touch-action: none;
	}
	.grip-n,
	.grip-s {
		left: 0.5rem;
		right: 0.5rem;
		height: 8px;
		cursor: ns-resize;
	}
	.grip-n {
		top: -4px;
	}
	.grip-s {
		bottom: -4px;
	}
	.grip-e,
	.grip-w {
		top: 0.5rem;
		bottom: 0.5rem;
		width: 8px;
		cursor: ew-resize;
	}
	.grip-e {
		right: -4px;
	}
	.grip-w {
		left: -4px;
	}
	.grip-ne,
	.grip-nw,
	.grip-se,
	.grip-sw {
		width: 14px;
		height: 14px;
	}
	.grip-ne {
		top: -4px;
		right: -4px;
		cursor: nesw-resize;
	}
	.grip-sw {
		bottom: -4px;
		left: -4px;
		cursor: nesw-resize;
	}
	.grip-nw {
		top: -4px;
		left: -4px;
		cursor: nwse-resize;
	}
	.grip-se {
		bottom: -4px;
		right: -4px;
		cursor: nwse-resize;
	}
	.docked-grip {
		bottom: 0;
		height: 8px;
	}
	.docked-grip::after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 2px;
		width: 2.5rem;
		height: 3px;
		transform: translateX(-50%);
		border-radius: 2px;
		background: var(--color-line);
	}

	.dock-placeholder {
		display: flex;
		justify-content: center;
		gap: 0.75rem;
		padding: 2rem 1rem;
		border: 1px dashed var(--color-line);
		border-radius: 0.5rem;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--color-fg-muted);
	}
	.dock-placeholder button {
		color: var(--color-accent);
		cursor: pointer;
	}
	.dock-placeholder button:hover {
		color: var(--color-accent-strong);
	}
</style>
