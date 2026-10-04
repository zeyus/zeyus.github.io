<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Frame for the hand-drawn timing SVGs: a horizontally scrollable canvas that stays inside the
	 * reading column, plus the shared SVG class vocabulary the figures are drawn with.
	 */
	let {
		controls,
		children,
		note,
		caption,
		id
	}: {
		controls?: Snippet;
		children: Snippet;
		note?: Snippet;
		caption: Snippet;
		id?: string;
	} = $props();
</script>

<figure class="timing-fig" {id}>
	{#if controls}
		{@render controls()}
	{/if}
	<div class="canvas">
		{@render children()}
	</div>
	{#if note}
		{@render note()}
	{/if}
	<figcaption class="mt-2 text-sm text-fg-muted">{@render caption()}</figcaption>
</figure>

<style>
	.timing-fig {
		/* signal colours, one per kind of connection */
		--net: #2a78d6;
		--gpio: #eb6834;
		--timer: #1baf7a;
		--light: #4a3aa7;
		--bio: #008300;
	}

	:global(.dark) .timing-fig {
		--net: #3987e5;
		--gpio: #e0632e;
		--timer: #22b07e;
		--light: #9085e9;
		--bio: #3aa33a;
	}

	.canvas {
		overflow-x: auto;
		padding: 10px;
		border: 1px solid var(--color-line);
		border-radius: 0.5rem;
		background-color: var(--color-surface-2);
	}

	.canvas :global(svg) {
		display: block;
		width: 100%;
		min-width: 720px;
		height: auto;
		color: var(--color-fg-strong);
	}

	/* a second svg is the animated scene under the timeline */
	.canvas :global(svg + svg) {
		margin-top: 10px;
		padding-top: 10px;
		border-top: 1px dashed var(--color-line);
	}

	/* SVG vocabulary */
	.canvas :global(text) {
		font-size: 13px;
		fill: var(--color-fg-strong);
	}
	.canvas :global(.t2) {
		fill: var(--color-fg-muted);
		font-size: 12px;
	}
	.canvas :global(.t3) {
		fill: var(--color-fg-subtle);
		font-size: 11px;
	}
	.canvas :global(.tm) {
		font-family: var(--font-mono);
		font-size: 11.5px;
		fill: var(--color-fg-muted);
	}
	.canvas :global(.tb) {
		font-weight: 600;
		font-size: 14px;
	}
	.canvas :global(.lane) {
		font-family: var(--font-mono);
		font-weight: 700;
		font-size: 14px;
	}
	.canvas :global(.box) {
		fill: var(--color-surface);
		stroke: var(--color-fg-subtle);
		stroke-width: 1.5;
	}
	.canvas :global(.box-strong) {
		fill: var(--color-surface);
		stroke: var(--color-fg-strong);
		stroke-width: 2.5;
	}
	.canvas :global(.frame) {
		fill: none;
		stroke: var(--color-line);
		stroke-width: 1.5;
		stroke-dasharray: 6 5;
	}
	.canvas :global(.grid) {
		stroke: var(--color-line);
		stroke-width: 1;
	}
	.canvas :global(.axis),
	.canvas :global(.tick) {
		stroke: var(--color-fg-subtle);
		stroke-width: 1;
	}
	.canvas :global(.w) {
		fill: none;
		stroke-width: 2.5;
		stroke-linejoin: round;
		stroke-linecap: round;
	}
	.canvas :global(.s-net) {
		stroke: var(--net);
	}
	.canvas :global(.s-gpio) {
		stroke: var(--gpio);
	}
	.canvas :global(.s-timer) {
		stroke: var(--timer);
	}
	.canvas :global(.s-light) {
		stroke: var(--light);
	}
	.canvas :global(.s-bio) {
		stroke: var(--bio);
	}
	.canvas :global(.s-ink) {
		stroke: var(--color-fg-muted);
	}
	.canvas :global(.s-idle) {
		stroke: var(--color-fg-subtle);
		stroke-dasharray: 2 5;
	}
	.canvas :global(.f-net) {
		fill: var(--net);
	}
	.canvas :global(.f-gpio) {
		fill: var(--gpio);
	}
	.canvas :global(.f-timer) {
		fill: var(--timer);
	}
	.canvas :global(.f-light) {
		fill: var(--light);
	}
	.canvas :global(.f-bio) {
		fill: var(--bio);
	}
	.canvas :global(.f-ink) {
		fill: var(--color-fg-muted);
	}
	.canvas :global(.dash) {
		stroke-dasharray: 6 5;
	}
	.canvas :global(.patch) {
		fill: #000;
		stroke: var(--color-fg-subtle);
		stroke-width: 1;
	}
	.canvas :global(.ground) {
		fill: var(--color-bg);
		stroke: none;
	}
</style>
