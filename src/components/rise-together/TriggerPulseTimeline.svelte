<script lang="ts">
	import { onDestroy } from 'svelte';
	import TimingFigure from './TimingFigure.svelte';
	import PlaybackControls from './PlaybackControls.svelte';
	import { Playback, pointAlong, progress, type Point } from './playback.svelte';

	// sized to the reading column: 256 px per ms, lanes from LEFT to RIGHT
	const LEFT = 150;
	const RIGHT = 854;
	const x = (ms: number) => 214 + ms * 256;

	/*
	 * Detail kept out of the caption (material for a deep dive):
	 * - the fixed delays (0.33 ms inside the Bela, plus whatever the trigger box and cable add)
	 *   are the same for every pulse, so a line fitted through thousands of pulses absorbs them
	 * - what varies is sampling: up to 0.02 ms at the Bela, and up to 0.5 ms at the amplifier,
	 *   or 2 ms when all of its boards run at 500 Hz
	 * - the edge crosses each cable in an instant; the time goes in the boxes
	 */

	// one edge, in ms after the coordinator writes the pin
	const tLogged = 0.02;
	const tSampled = 0.0094; // the Bela's next 48 kHz sample
	const tForwarded = tSampled + 16 / 48; // copied to the output one 16-frame block later
	const tBoxOut = tForwarded + 0.07; // δ, drawn at an arbitrary width: it is not measured
	const tStamped = 0.65; // the hyperscanner's next 2 kHz tick

	const belaSamples = Array.from({ length: 28 }, (_, i) => x(tSampled + (i - 12) / 48));
	const stampTicks = [0.15, 0.65, 1.15, 1.65, 2.15].map(x);
	const eegSamples = [-0.2, 1.8].map(x);
	const axis = [0, 0.5, 1, 1.5, 2, 2.5];

	// the animation covers the part of the timeline where the edge is still on its way
	const playback = new Playback({ start: -0.25, end: 1, seconds: 8 });
	onDestroy(playback.pause);

	// scene geometry: four boxes on one wire
	const WIRE_Y = 92;
	const boxes = [
		{ x: 16, w: 150, name: 'Coordinator', sub: 'writes its GPIO pin', from: 0 },
		{ x: 236, w: 170, name: 'Bela', sub: 'pin 11 in → pin 13 out', from: tSampled },
		{ x: 476, w: 150, name: 'Trigger box', sub: '+ splitter and cable', from: tForwarded },
		{ x: 696, w: 158, name: 'Hyperscanner', sub: 'stamps on a 2 kHz clock', from: tStamped }
	];
	const [coord, bela, , scanner] = boxes;
	const at = (px: number): Point => [px, WIRE_Y];

	// where the edge is at time t; a cable is crossed in an instant, the time goes inside the boxes
	const pulseAt = (t: number): Point => {
		if (t < 0) return at(coord.x + coord.w - 14);
		if (t < tSampled)
			return pointAlong([at(coord.x + coord.w), at(bela.x)], progress(t, 0, tSampled));
		if (t < tForwarded)
			return pointAlong([at(bela.x), at(bela.x + bela.w)], progress(t, tSampled, tForwarded));
		if (t < tBoxOut)
			return pointAlong([at(bela.x + bela.w), at(scanner.x)], progress(t, tForwarded, tBoxOut));
		if (t < tStamped) return at(scanner.x);
		return at(scanner.x + 26);
	};
	const stageAt = (t: number) => {
		if (t < 0) return 'the coordinator is about to write its GPIO pin';
		if (t < tSampled) return 'pin written · the Bela sees it at its next sample';
		if (t < tForwarded) return 'inside the Bela · copied to the output one block (16 frames) later';
		if (t < tBoxOut) return 'through the trigger box, splitter and cable (δ)';
		if (t < tStamped) return 'at the hyperscanner · waiting for its next 2 kHz tick';
		return 'stamped · written next to the EEG, between two of its samples';
	};

	let t = $derived(playback.t);
	let pulse = $derived(pulseAt(t));
	let waiting = $derived(t >= tBoxOut && t < tStamped);
</script>

<TimingFigure id="trigger-pulse-timeline">
	<svg
		viewBox="0 0 870 440"
		role="img"
		aria-label="Millisecond timeline of one trigger edge. The coordinator writes the pin at 0 ms and logs it 0.02 ms later. The Bela samples the edge within 0.02 ms and outputs it 16 frames, 0.33 ms, later. After an unmeasured constant delay through the trigger box, the hyperscanner stamps it at its next 2 kHz tick, up to 0.5 ms late. The event then falls between two 500 Hz EEG samples."
	>
		<!-- lane labels -->
		<text x="16" y="64" class="lane">Coordinator</text>
		<text x="16" y="134" class="lane">Bela input</text>
		<text x="16" y="151" class="t3">pin 11 · 48 kHz</text>
		<text x="16" y="204" class="lane">Bela output</text>
		<text x="16" y="221" class="t3">pin 13</text>
		<text x="16" y="274" class="lane">Trigger box</text>
		<text x="16" y="291" class="t3">→ splitter → trig_in1</text>
		<text x="16" y="334" class="lane">Hyperscanner</text>
		<text x="16" y="351" class="t3">2 kHz stamp</text>
		<text x="16" y="394" class="lane">EEG board</text>
		<text x="16" y="411" class="t3">500 Hz samples</text>

		{#each [96, 166, 236, 306, 366] as y (y)}
			<line class="grid" x1={LEFT} y1={y} x2={RIGHT} y2={y} />
		{/each}

		<!-- coordinator -->
		<polyline class="w s-gpio" points="{LEFT},74 {x(0)},74 {x(0)},50 {RIGHT},50" />
		<line
			x1={x(tLogged)}
			y1="44"
			x2={x(tLogged)}
			y2="80"
			stroke="currentColor"
			stroke-width="1.5"
		/>
		<text x={x(tLogged) + 10} y="38" class="t2"
			>pin written · logged 0.02 ms later on the coordinator's clock</text
		>

		<!-- Bela input with sample ticks -->
		<g stroke="var(--color-fg-subtle)" stroke-width="1" opacity="0.55">
			{#each belaSamples as tx (tx)}
				<line x1={tx} y1="148" x2={tx} y2="156" />
			{/each}
		</g>
		<polyline
			class="w s-gpio"
			points="{LEFT},144 {x(tSampled)},144 {x(tSampled)},120 {RIGHT},120"
		/>
		<text x={x(tLogged) + 10} y="112" class="t2"
			>seen at the next of 48 000 samples a second · at most 0.02 ms late</text
		>

		<!-- Bela output -->
		<polyline
			class="w s-gpio"
			points="{LEFT},214 {x(tForwarded)},214 {x(tForwarded)},190 {RIGHT},190"
		/>
		<path
			d="M{x(tSampled)} 228 V 232 H {x(tForwarded)} V 228"
			fill="none"
			class="s-ink"
			stroke-width="1.2"
		/>
		<text x={x(tForwarded) + 10} y="184" class="t2"
			>copied one block later: exactly 16 frames = 0.33 ms, every time</text
		>

		<!-- trigger box -->
		<polyline class="w s-gpio" points="{LEFT},284 {x(tBoxOut)},284 {x(tBoxOut)},260 {RIGHT},260" />
		<path
			d="M{x(tForwarded)} 298 V 302 H {x(tBoxOut)} V 298"
			fill="none"
			class="s-ink"
			stroke-width="1.2"
		/>
		<text x={x(tBoxOut) + 10} y="254" class="t2"
			>+ δ through trigger box, splitter and cable · unmeasured but constant</text
		>

		<!-- hyperscanner ticks -->
		<g stroke="var(--color-fg-subtle)" stroke-width="1.5">
			{#each stampTicks as tx (tx)}
				<line x1={tx} y1="322" x2={tx} y2="346" />
			{/each}
		</g>
		<circle cx={x(tStamped)} cy="334" r="7" class="f-gpio" />
		<path
			d="M{x(tBoxOut)} 350 V 354 H {x(tStamped)} V 350"
			fill="none"
			class="s-ink"
			stroke-width="1.2"
		/>
		<text x={x(tStamped) + 12} y="316" class="t2"
			>stamped at the next 2 kHz tick · 0 to 0.5 ms late (0 to 2 ms at 500 Hz)</text
		>

		<!-- EEG samples -->
		<g stroke="var(--bio)" stroke-width="2">
			{#each eegSamples as tx (tx)}
				<line x1={tx} y1="380" x2={tx} y2="408" />
			{/each}
		</g>
		{#each eegSamples as tx (tx)}
			<circle cx={tx} cy="394" r="4" class="f-bio" />
		{/each}
		<line
			x1={x(tStamped)}
			y1="378"
			x2={x(tStamped)}
			y2="410"
			stroke="var(--gpio)"
			stroke-width="2"
			stroke-dasharray="4 3"
		/>
		<text x={x(tStamped) + 12} y="398" class="t2"
			>lands between two EEG samples: sample n + 0.43</text
		>

		<!-- playhead -->
		<line class="playhead" x1={x(t)} y1="26" x2={x(t)} y2="420" />

		<!-- axis -->
		<line class="axis" x1={LEFT} y1="420" x2={RIGHT} y2="420" />
		{#each axis as t (t)}
			<text x={x(t)} y="436" text-anchor={t === 2.5 ? 'end' : 'middle'} class="t3"
				>{t}{t === 0 || t === 2.5 ? ' ms' : ''}</text
			>
		{/each}
	</svg>

	<!-- the same edge as a journey: one wire, four boxes -->
	<svg class="scene" viewBox="0 0 870 150" aria-hidden="true">
		<text x="16" y="24" class="tm">t = {t.toFixed(2)} ms</text>
		<text x="120" y="24" class="t2">{stageAt(t)}</text>

		<!-- wire: idle ahead of the edge, lit behind it -->
		<line class="w s-idle" x1={coord.x + coord.w} y1={WIRE_Y} x2={scanner.x} y2={WIRE_Y} />
		{#if t >= 0}
			<line class="w s-gpio" x1={coord.x + coord.w} y1={WIRE_Y} x2={pulse[0]} y2={WIRE_Y} />
		{/if}

		{#each boxes as b (b.name)}
			<rect
				class="station"
				class:reached={t >= b.from}
				x={b.x}
				y="52"
				width={b.w}
				height="80"
				rx="8"
			/>
			<text x={b.x + b.w / 2} y="72" text-anchor="middle" class="tb">{b.name}</text>
			<text x={b.x + b.w / 2} y="124" text-anchor="middle" class="t3">{b.sub}</text>
		{/each}

		<!-- the Bela's one-block wait -->
		<rect class="meter" x={bela.x + 12} y="104" width={bela.w - 24} height="4" rx="2" />
		<rect
			class="f-gpio"
			x={bela.x + 12}
			y="104"
			width={(bela.w - 24) * progress(t, tSampled, tForwarded)}
			height="4"
			rx="2"
		/>

		<!-- the hyperscanner's wait for its next tick -->
		<rect class="meter" x={scanner.x + 12} y="104" width={scanner.w - 24} height="4" rx="2" />
		<rect
			class="f-gpio"
			x={scanner.x + 12}
			y="104"
			width={(scanner.w - 24) * progress(t, tBoxOut, tStamped)}
			height="4"
			rx="2"
		/>

		<!-- the edge itself -->
		<circle class="f-gpio" class:waiting cx={pulse[0]} cy={pulse[1]} r="12" opacity="0.25" />
		<circle class="f-gpio" cx={pulse[0]} cy={pulse[1]} r="6" />
	</svg>

	{#snippet note()}
		<PlaybackControls {playback} decimals={2} />
	{/snippet}

	{#snippet caption()}
		The game marks moments in the brain recording by sending an electrical pulse down a wire to the
		EEG amplifiers. Here is one pulse making that trip. Press play to follow it, slowed down about
		6000 times.
	{/snippet}
</TimingFigure>

<style>
	.playhead {
		stroke: var(--color-accent);
		stroke-width: 1.5;
	}

	.station {
		fill: var(--color-surface);
		stroke: var(--color-fg-subtle);
		stroke-width: 1.5;
	}

	.station.reached {
		stroke: var(--gpio);
		stroke-width: 2.5;
	}

	.meter {
		fill: var(--color-line);
	}

	.waiting {
		animation: wait-pulse 0.5s ease-in-out infinite alternate;
	}

	@keyframes wait-pulse {
		to {
			opacity: 0.6;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.waiting {
			animation: none;
		}
	}
</style>
