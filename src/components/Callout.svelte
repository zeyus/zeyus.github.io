<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		label = 'NOTE',
		id = undefined,
		children
	}: {
		label?: string;
		id?: string;
		children: Snippet;
	} = $props();
</script>

<aside class="callout" {id}>
	<span class="callout-label">[{label}]</span>
	<div class="callout-body">{@render children()}</div>
</aside>

<style>
	.callout {
		position: relative;
		margin-block: 2em;
		padding: 1em 1.25em;
		border-left: 3px solid var(--color-accent);
		border-radius: 0 0.5rem 0.5rem 0;
		background:
			repeating-linear-gradient(
				to bottom,
				transparent 0 2px,
				color-mix(in oklab, var(--color-accent) 6%, transparent) 2px 3px
			),
			var(--color-surface-2);
		box-shadow: -4px 0 16px -6px var(--color-glow);
	}

	.callout-label {
		display: block;
		margin-bottom: 0.25em;
		font-family: var(--font-mono);
		font-size: 0.75em;
		letter-spacing: 0.05em;
		color: var(--color-accent);
	}

	.callout-body :global(p:last-child) {
		margin-bottom: 0;
	}
</style>
