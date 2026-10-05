<script lang="ts">
	import { onMount, tick, type Snippet } from 'svelte';

	let {
		label = 'DEEP DIVE',
		title,
		open = $bindable(false),
		id = undefined,
		children
	}: {
		label?: string;
		title: string;
		open?: boolean;
		id?: string;
		children: Snippet;
	} = $props();

	let el: HTMLDetailsElement;

	// Expand when a link targets this element (or something inside it).
	function reveal(hash: string) {
		if (open || hash.length < 2) return;
		const target = document.getElementById(decodeURIComponent(hash.slice(1)));
		if (!target || !el.contains(target)) return;
		open = true;
		// Content inside a closed <details> has no box to scroll to until it renders.
		if (target !== el) tick().then(() => target.scrollIntoView());
	}

	// hashchange doesn't fire when the hash is already current, so watch clicks too.
	function onclick(e: MouseEvent) {
		const a = (e.target as Element).closest?.<HTMLAnchorElement>('a[href*="#"]');
		if (a && a.pathname === location.pathname) reveal(a.hash);
	}

	onMount(() => reveal(location.hash));
</script>

<svelte:window onhashchange={() => reveal(location.hash)} {onclick} />

<details class="details" {id} bind:open bind:this={el}>
	<summary>
		<span class="details-label">[{label}]</span>
		<span class="details-title">{title}</span>
	</summary>
	<div class="details-body">{@render children()}</div>
</details>

<style>
	.details {
		margin-block: 2em;
		border-left: 3px dashed var(--color-accent);
		border-radius: 0 0.5rem 0.5rem 0;
		background:
			repeating-linear-gradient(
				to bottom,
				transparent 0 2px,
				color-mix(in oklab, var(--color-accent) 6%, transparent) 2px 3px
			),
			var(--color-surface-2);
	}

	.details[open] {
		border-left-style: solid;
		box-shadow: -4px 0 16px -6px var(--color-glow);
	}

	summary {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0 0.6em;
		padding: 0.75em 1.25em;
		border-radius: 0 0.5rem 0.5rem 0;
		font-family: var(--font-mono);
		font-size: 0.75em;
		letter-spacing: 0.05em;
		list-style: none;
		cursor: pointer;
		user-select: none;
	}

	summary::-webkit-details-marker {
		display: none;
	}

	summary::before {
		content: '▸';
		color: var(--color-accent);
		transition: transform 0.15s;
	}

	.details[open] > summary::before {
		transform: rotate(90deg);
	}

	summary:hover .details-title {
		color: var(--color-fg-strong);
	}

	.details-label {
		color: var(--color-accent);
	}

	.details-title {
		flex: 1;
		min-width: 0;
		color: var(--color-fg-muted);
	}

	.details-body {
		padding: 0.25em 1.25em 1em;
	}

	.details-body :global(p:last-child) {
		margin-bottom: 0;
	}

	/* flowbite's P is text-base, but a List inherits the article's larger fluid size */
	.details-body :global(:is(ul, ol)) {
		font-size: 1rem;
		line-height: 1.5;
	}

	/* same `>` prompt marker that nested lists get from app.css, hanging outside the text */
	.details-body :global(ul:not(.list-none)) {
		list-style-position: outside;
		margin-left: 1.5rem;
	}

	.details-body :global(ul:not(.list-none) > li::marker) {
		content: '> ';
		color: var(--color-accent);
		font-weight: 900;
	}

	.details-body > :global(ul:not(.list-none) > li + li) {
		margin-top: 0.5em;
	}
</style>
