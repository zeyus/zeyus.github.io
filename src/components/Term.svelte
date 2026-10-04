<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		def,
		children
	}: {
		def: string;
		children: Snippet;
	} = $props();

	const id = $props.id();

	let root: HTMLElement | undefined = $state();
	let bubble: HTMLElement | undefined = $state();

	// hover/focus show the definition while they last, click/tap pins it open
	let hovered = $state(false);
	let focused = $state(false);
	let pinned = $state(false);
	let open = $derived(hovered || focused || pinned);

	let shift = $state(0);
	let above = $state(false);

	const close = () => {
		hovered = false;
		focused = false;
		pinned = false;
	};

	$effect(() => {
		if (!open || !root || !bubble) return;

		// keep the bubble inside the viewport, and flip it above the term if there's no room below
		const margin = 8;
		const rect = root.getBoundingClientRect();
		const width = bubble.offsetWidth;
		const height = bubble.offsetHeight;
		const left = rect.left + rect.width / 2 - width / 2;
		const viewportWidth = document.documentElement.clientWidth;
		shift = Math.max(margin - left, Math.min(0, viewportWidth - margin - width - left));
		above = rect.bottom + height + margin > window.innerHeight && rect.top > height + margin;

		const onPointerDown = (e: PointerEvent) => {
			if (!root?.contains(e.target as Node)) close();
		};
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close();
		};
		document.addEventListener('pointerdown', onPointerDown);
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('pointerdown', onPointerDown);
			document.removeEventListener('keydown', onKeyDown);
		};
	});
</script>

<span
	class="term"
	class:open
	class:above
	bind:this={root}
	onpointerenter={(e) => {
		if (e.pointerType === 'mouse') hovered = true;
	}}
	onpointerleave={() => (hovered = false)}
	role="presentation"
>
	<button
		type="button"
		class="term-trigger"
		aria-describedby={id}
		aria-expanded={open}
		onclick={() => (pinned = !pinned)}
		onfocus={(e) => (focused = e.currentTarget.matches(':focus-visible'))}
		onblur={() => (focused = false)}>{@render children()}</button
	><span class="term-pop" style:--term-shift="{shift}px"
		><span class="term-def" role="tooltip" {id} bind:this={bubble}>{def}</span></span
	>
</span>

<style>
	.term {
		position: relative;
	}

	.term-trigger {
		font: inherit;
		color: inherit;
		white-space: nowrap;
		cursor: help;
		text-decoration: underline dotted var(--color-accent);
		text-decoration-thickness: 0.1em;
		text-underline-offset: 0.2em;
		transition: text-shadow 0.2s;
	}

	.term-trigger:hover,
	.open .term-trigger {
		color: var(--color-accent-strong);
		text-shadow: 0 0 8px var(--color-glow);
	}

	/* the padding bridges the gap to the term, so the pointer can travel onto the definition */
	.term-pop {
		display: none;
		position: absolute;
		z-index: 30;
		top: 100%;
		left: 50%;
		padding-block: 0.4em;
		transform: translateX(calc(-50% + var(--term-shift, 0px)));
	}

	.above .term-pop {
		top: auto;
		bottom: 100%;
	}

	.open .term-pop {
		display: block;
		animation: term-in 0.15s ease-out;
	}

	.term-def {
		display: block;
		width: max-content;
		max-width: min(22rem, calc(100vw - 16px));
		padding: 0.6em 0.8em;
		border: 1px solid var(--color-line);
		border-left: 3px solid var(--color-accent);
		border-radius: 0 0.5rem 0.5rem 0;
		background-color: var(--color-surface-2);
		box-shadow:
			0 8px 24px -8px rgb(0 0 0 / 0.4),
			-4px 0 16px -6px var(--color-glow);
		font-size: 0.8em;
		line-height: 1.5;
		text-align: left;
		white-space: normal;
		color: var(--color-fg);
	}

	@keyframes term-in {
		from {
			opacity: 0;
		}
	}
</style>
