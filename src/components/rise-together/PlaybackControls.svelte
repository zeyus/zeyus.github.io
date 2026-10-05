<script lang="ts">
	import type { Playback } from './playback.svelte';

	let {
		playback,
		decimals = 1,
		unit = 'ms'
	}: {
		playback: Playback;
		decimals?: number;
		unit?: string;
	} = $props();
</script>

<div class="playback">
	<button
		type="button"
		onclick={playback.toggle}
		aria-label={playback.playing ? 'Pause the animation' : 'Play the animation'}
	>
		{playback.playing ? '❚❚ pause' : '▶ play'}
	</button>
	<input
		type="range"
		autocomplete="off"
		aria-label="Time in the figure"
		min={playback.start}
		max={playback.end}
		step={(playback.end - playback.start) / 500}
		value={playback.t}
		oninput={(e) => playback.seek(e.currentTarget.valueAsNumber)}
	/>
	<output>t = {playback.t.toFixed(decimals)} {unit}</output>
</div>

<style>
	.playback {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-top: 0.75rem;
		font-family: var(--font-mono);
		font-size: 0.75rem;
	}

	button {
		flex: none;
		min-width: 6.5em;
		padding: 0.4rem 0.8rem;
		border: 1px solid var(--color-accent);
		border-radius: 999px;
		background-color: var(--color-surface-2);
		color: var(--color-fg-strong);
		line-height: 1;
		cursor: pointer;
	}

	button:hover {
		box-shadow: inset 0 0 0 1px var(--color-accent);
	}

	button:focus-visible,
	input:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}

	input {
		flex: 1;
		min-width: 0;
		accent-color: var(--color-accent);
	}

	output {
		flex: none;
		min-width: 9em;
		text-align: right;
		color: var(--color-fg-muted);
		font-variant-numeric: tabular-nums;
	}
</style>
