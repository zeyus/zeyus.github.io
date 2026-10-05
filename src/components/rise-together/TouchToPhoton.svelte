<script module lang="ts">
	import { Playback } from './playback.svelte';

	/*
	 * Medians, in ms. Each leg is measured on its own, so the timeline is their sum rather than
	 * one end-to-end measurement.
	 *
	 * bench: bela-lsl-timing session 20260909_114121_7882 (iPad Pro M4 at 120 Hz, n = 228)
	 * lab:   RiseTogether test session of 18 September 2026 (six iPads, joint condition)
	 *
	 * Caveats, kept out of the caption (material for a deep dive):
	 * - the touch and handler times come from the bench rig: a force sensor under the finger and
	 *   a photodiode on the screen, both read by a Bela; the network, physics and display legs
	 *   come from the lab session; only the wait for the next display frame is estimated
	 * - the force sensor needs some pressure before it trips, so the real delay from first
	 *   contact is, if anything, a little longer
	 * - the split around the iOS timestamp depends on matching the iPad's clock to the Bela's
	 * - when someone plays alone the physics runs on their own iPad, and the three middle lanes
	 *   drop out
	 */
	const FINGER_TO_OS_STAMP = 12.1; // bench: FSR edge → OS touch timestamp
	const OS_STAMP_TO_HANDLER = 9.6; // bench: OS touch timestamp → Dart handler (FSR → handler 21.7)
	const PRESS_TO_COORDINATOR = 5.8; // lab: press logged → arrives at the coordinator
	const PRESS_TO_BROADCAST = 9.2; // lab: press logged → first broadcast that contains it
	const BROADCAST_TO_IPAD = 5.0; // lab: broadcast → received on an iPad (n = 257k)
	const FRAME_WAIT = 4.2; // not measured: half of one 120 Hz frame, 0–8.3 ms
	const PAINT_TO_PHOTON = 17.7; // lab: paint → photodiode, the faster of two peaks
	const PAINT_TO_PHOTON_LATE = 25.7; // lab: the same, one frame later
	const BENCH_LOOP = 55.5; // bench: FSR → photodiode in a local app with no network
	const FRAME = 1000 / 120;

	// time (ms after the finger lands) at the end of each leg
	const tStamp = FINGER_TO_OS_STAMP;
	const tPress = tStamp + OS_STAMP_TO_HANDLER;
	const tArrive = tPress + PRESS_TO_COORDINATOR;
	const tBroadcast = tPress + PRESS_TO_BROADCAST;
	const tReceive = tBroadcast + BROADCAST_TO_IPAD;
	const tPaint = tReceive + FRAME_WAIT;
	const tPhoton = tPaint + PAINT_TO_PHOTON;
	const tPhotonLate = tPaint + PAINT_TO_PHOTON_LATE;

	/** The figure's clock. Make one yourself to drive the figure from outside, or to share it. */
	export const createPlayback = () => new Playback({ start: -2, end: 70, seconds: 12 });

	/** The end of each leg, in order: where a step-by-step walkthrough of the figure pauses. */
	export const stops = [tStamp, tPress, tArrive, tBroadcast, tReceive, tPaint, tPhoton];
</script>

<script lang="ts">
	import { onDestroy, untrack } from 'svelte';
	import TimingFigure from './TimingFigure.svelte';
	import PlaybackControls from './PlaybackControls.svelte';
	import { pointAlong, progress, type Point } from './playback.svelte';

	// sized to the reading column: 8 px per ms, lanes from LEFT to RIGHT, 0 ms at X0
	const LEFT = 160;
	const RIGHT = 850;
	const X0 = 176;
	const PX = 8;
	const x = (ms: number) => X0 + ms * PX;
	const ms = (v: number) => Math.round(v);

	// every 120 Hz instant that fits on the axis, phased so one of them lands on `anchor`
	const ticksThrough = (anchor: number) => {
		const out: number[] = [];
		const first = anchor - Math.floor((anchor + 2) / FRAME) * FRAME;
		for (let t = first; t <= 84; t += FRAME) out.push(x(t));
		return out;
	};
	const physicsTicks = ticksThrough(tBroadcast);
	const frameTicks = ticksThrough(tPaint);

	const axis = [0, 10, 20, 30, 40, 50, 60, 70, 80];
	const lanes = [
		{ y: 118, name: 'Finger', sub: 'force sensor on glass' },
		{ y: 168, name: 'Touchscreen', sub: 'digitiser + iOS' },
		{ y: 218, name: 'iPad app', sub: 'Flutter → game code' },
		{ y: 268, name: 'Network', sub: 'iPad → coordinator' },
		{ y: 318, name: 'Coordinator', sub: 'physics · 120 steps/s' },
		{ y: 368, name: 'Network', sub: 'coordinator → iPads' },
		{ y: 418, name: 'iPad app', sub: '120 frames a second' },
		{ y: 468, name: 'GPU → panel', sub: '' },
		{ y: 518, name: 'Light', sub: 'at the photodiode' }
	];

	let {
		playback = createPlayback(),
		autoplay = false
	}: {
		playback?: Playback;
		/** play from the start whenever this turns on, and pause when it turns off */
		autoplay?: boolean;
	} = $props();
	onDestroy(() => playback.pause());

	$effect(() => {
		const on = autoplay && !matchMedia('(prefers-reduced-motion: reduce)').matches;
		// untracked: only `autoplay` changing should restart the clock, not the clock itself
		untrack(() => {
			if (!on) return playback.pause();
			playback.seek(playback.start);
			playback.play();
		});
	});

	/*
	 * Scene geometry. The iPad is a stack of planes; the press goes down through them on the left
	 * (DOWN_X), out to the coordinator and back, and the new state comes up on the right (UP_X).
	 */
	const STACK_X = 160;
	const DOWN_X = 130;
	const UP_X = 190;
	const planes = [
		{ y: 62, name: 'glass', from: 0 },
		{ y: 98, name: 'iOS', from: tStamp },
		{ y: 134, name: 'app', from: tPress },
		{ y: 170, name: 'LSL', from: tPress }
	];
	const [glass, ios, app, lsl] = planes;
	const plane = (y: number) =>
		`${STACK_X - 51},${y - 11} ${STACK_X + 79},${y - 11} ${STACK_X + 51},${y + 11} ${STACK_X - 79},${y + 11}`;
	const OUT_Y = lsl.y - 5; // wire to the coordinator
	const BACK_Y = lsl.y + 9; // wire back
	const WIRE_X0 = STACK_X + 62;
	const COORD = { x: 610, y: 128, w: 200, h: 70 };

	// where the press (and then the new game state) is at time t
	const dotAt = (t: number): Point => {
		if (t < tStamp)
			return pointAlong(
				[
					[DOWN_X, glass.y],
					[DOWN_X, ios.y]
				],
				progress(t, 0, tStamp)
			);
		if (t < tPress)
			return pointAlong(
				[
					[DOWN_X, ios.y],
					[DOWN_X, app.y]
				],
				progress(t, tStamp, tPress)
			);
		if (t < tArrive)
			return pointAlong(
				[
					[DOWN_X, app.y],
					[DOWN_X, OUT_Y],
					[COORD.x, OUT_Y]
				],
				progress(t, tPress, tArrive)
			);
		if (t < tBroadcast)
			return pointAlong(
				[
					[COORD.x, OUT_Y],
					[COORD.x + 24, OUT_Y],
					[COORD.x + 24, BACK_Y],
					[COORD.x, BACK_Y]
				],
				progress(t, tArrive, tBroadcast)
			);
		if (t < tReceive)
			return pointAlong(
				[
					[COORD.x, BACK_Y],
					[UP_X, BACK_Y],
					[UP_X, lsl.y]
				],
				progress(t, tBroadcast, tReceive)
			);
		if (t < tPaint)
			return pointAlong(
				[
					[UP_X, lsl.y],
					[UP_X, app.y]
				],
				progress(t, tReceive, tPaint)
			);
		return pointAlong(
			[
				[UP_X, app.y],
				[UP_X, ios.y],
				[UP_X, glass.y]
			],
			progress(t, tPaint, tPhoton)
		);
	};
	const stageAt = (t: number) => {
		if (t < 0) return 'finger on its way down';
		if (t < tStamp) return 'finger on the glass · nothing has noticed yet';
		if (t < tPress) return 'iOS has timestamped the touch · waiting for the game to hear of it';
		if (t < tArrive) return 'press logged and sent to the coordinator';
		if (t < tBroadcast) return 'at the coordinator · waiting for the next physics step';
		if (t < tReceive) return 'new game state on its way back to every iPad';
		if (t < tPaint) return 'state received · waiting for the next display frame (estimated)';
		if (t < tPhoton) return 'rendering, compositing and scanning out to the panel';
		return 'light leaves the screen · the paddle moves';
	};

	let t = $derived(playback.t);
	let dot = $derived(dotAt(t));
	// blue on the network, violet on the way back up to the screen, grey before that
	let dotClass = $derived(t < tPress ? 'f-ink' : t < tReceive ? 'f-net' : 'f-light');
	let lit = $derived(t >= tPhoton);
	// the finger hovers, then presses and stays down
	let fingerY = $derived(glass.y - 16 - 14 * (1 - progress(t, -2, 0)));
</script>

<TimingFigure>
	<svg
		viewBox="0 0 860 580"
		role="img"
		aria-label="Millisecond timeline of one button press in the joint game, from the finger landing to the screen changing. The operating system timestamps the touch about {ms(
			tStamp
		)} ms after the finger lands, and the app handles it at about {ms(
			tPress
		)} ms. The press reaches the coordinator at about {ms(
			tArrive
		)} ms, is applied in a physics step and broadcast at about {ms(
			tBroadcast
		)} ms, and arrives back on the iPads at about {ms(
			tReceive
		)} ms. It is painted on the next display frame, and the light changes at about {ms(
			tPhoton
		)} ms, or {ms(
			tPhotonLate
		)} ms one frame later. For comparison, a bench app with no network measured {BENCH_LOOP} ms from finger to light."
	>
		<!-- brackets: composed in-game total, and the measured bench loop -->
		<path
			d="M{x(0)} 44 V 38 H {x(tPhoton)} V 44"
			fill="none"
			stroke="var(--light)"
			stroke-width="2"
		/>
		<path
			class="dash"
			d="M{x(tPhoton)} 38 H {x(tPhotonLate)} V 44"
			fill="none"
			stroke="var(--light)"
			stroke-width="2"
		/>
		<text x={x(0)} y="28"
			>in the game: finger → light ≈ {ms(tPhoton)} ms, or ≈ {ms(tPhotonLate)} one frame later</text
		>
		<path d="M{x(0)} 84 V 78 H {x(BENCH_LOOP)} V 84" fill="none" class="s-ink" stroke-width="1.5" />
		<text x={x(0)} y="70" class="t2"
			>bench app, no network: {BENCH_LOOP} ms from force sensor to photodiode</text
		>

		<!-- key -->
		<line x1="740" y1="24" x2="768" y2="24" class="s-ink" stroke-width="2" />
		<text x="776" y="28" class="t3">measured</text>
		<line x1="740" y1="44" x2="768" y2="44" class="s-ink dash" stroke-width="2" />
		<text x="776" y="48" class="t3">estimated</text>

		<!-- lanes -->
		{#each lanes as lane, i (lane.y)}
			<text x="16" y={lane.y - 4} class="lane">{lane.name}</text>
			<text x="16" y={lane.y + 13} class="t3">{lane.sub}</text>
			{#if i > 0}
				<line class="grid" x1={LEFT} y1={lane.y - 26} x2={RIGHT} y2={lane.y - 26} />
			{/if}
		{/each}

		<!-- 1 · finger -->
		<line x1={x(0)} y1="96" x2={x(0)} y2="548" class="s-ink" stroke-width="1" opacity="0.4" />
		<circle cx={x(0)} cy="118" r="6" class="f-ink" />
		<text x={x(0) + 12} y="122" class="t2">finger lands on the glass</text>

		<!-- 2 · digitiser + iOS -->
		<rect
			x={x(0)}
			y="160"
			width={x(tStamp) - x(0)}
			height="16"
			rx="3"
			class="f-gpio"
			opacity="0.4"
		/>
		<circle cx={x(tStamp)} cy="168" r="6" class="f-gpio" />
		<text x={x(tStamp) + 12} y="172" class="t2"
			>iOS timestamps the touch · the ≈ {ms(FINGER_TO_OS_STAMP)} ms before this is in no log</text
		>

		<!-- 3 · app handles it -->
		<rect
			x={x(tStamp)}
			y="210"
			width={x(tPress) - x(tStamp)}
			height="16"
			rx="3"
			class="f-ink"
			opacity="0.35"
		/>
		<circle cx={x(tPress)} cy="218" r="6" class="f-ink" />
		<text x={x(tPress) + 12} y="222" class="t2"
			>the game's handler runs ≈ {ms(OS_STAMP_TO_HANDLER)} ms later · press logged and sent</text
		>

		<!-- 4 · to the coordinator -->
		<line x1={x(tPress)} y1="268" x2={x(tArrive)} y2="268" class="w s-net" />
		<circle cx={x(tArrive)} cy="268" r="6" class="f-net" />
		<text x={x(tArrive) + 12} y="272" class="t2"
			>reaches the coordinator ≈ {ms(PRESS_TO_COORDINATOR)} ms later</text
		>

		<!-- 5 · physics step and broadcast -->
		<g stroke="var(--color-fg-subtle)" stroke-width="1.5">
			{#each physicsTicks as tx (tx)}
				<line x1={tx} y1="298" x2={tx} y2="314" />
			{/each}
		</g>
		<path
			d="M{x(tArrive)} 318 V 322 H {x(tBroadcast)} V 318"
			fill="none"
			class="s-ink"
			stroke-width="1.2"
		/>
		<circle cx={x(tBroadcast)} cy="306" r="6" class="f-timer" />
		<text x={x(tBroadcast) + 12} y="336" class="t2"
			>the next physics step applies it and broadcasts the new state</text
		>

		<!-- 6 · back to the iPads -->
		<line x1={x(tBroadcast)} y1="368" x2={x(tReceive)} y2="368" class="w s-net" />
		<circle cx={x(tReceive)} cy="368" r="6" class="f-net" />
		<text x={x(tReceive) + 12} y="372" class="t2"
			>arrives on every iPad ≈ {ms(BROADCAST_TO_IPAD)} ms later</text
		>

		<!-- 7 · next display frame -->
		<g stroke="var(--color-fg-subtle)" stroke-width="1.5">
			{#each frameTicks as tx (tx)}
				<line x1={tx} y1="398" x2={tx} y2="414" />
			{/each}
		</g>
		<path
			class="s-ink dash"
			d="M{x(tReceive)} 418 V 422 H {x(tPaint)} V 418"
			fill="none"
			stroke-width="1.2"
		/>
		<circle cx={x(tPaint)} cy="406" r="6" class="f-light" />
		<text x={x(tPaint) + 12} y="436" class="t2"
			>painted on the next display frame · a 0 to 8 ms wait</text
		>

		<!-- 8 · render, composite, scan out -->
		<rect
			x={x(tPaint)}
			y="460"
			width={x(tPhoton) - x(tPaint)}
			height="16"
			rx="3"
			class="f-light"
			opacity="0.4"
		/>
		<rect
			x={x(tPhoton)}
			y="460"
			width={x(tPhotonLate) - x(tPhoton)}
			height="16"
			rx="3"
			fill="none"
			stroke="var(--light)"
			stroke-width="1.5"
			stroke-dasharray="4 3"
		/>
		<text x={x(tPaint) - 12} y="472" text-anchor="end" class="t2"
			>render · composite · scan out: ≈ {ms(PAINT_TO_PHOTON)} ms, often ≈ {ms(
				PAINT_TO_PHOTON_LATE
			)}</text
		>

		<!-- 9 · light -->
		<polyline
			class="w s-light"
			points="{LEFT},530 {x(tPhoton)},530 {x(tPhoton)},506 {RIGHT},506"
			style="stroke-width:2"
		/>
		<circle cx={x(tPhoton)} cy="506" r="6" class="f-light" />
		<text x={x(tPhoton) - 12} y="522" text-anchor="end" class="t2"
			>the paddle moves on screen · ≈ {ms(tPhoton)} ms after the finger landed</text
		>

		<!-- playhead -->
		<line class="playhead" x1={x(t)} y1="96" x2={x(t)} y2="552" />

		<!-- axis -->
		<line class="axis" x1={LEFT} y1="552" x2={RIGHT} y2="552" />
		{#each axis as t (t)}
			<line class="tick" x1={x(t)} y1="552" x2={x(t)} y2="557" />
			<text x={x(t)} y="572" text-anchor="middle" class="t3">{t}{t === 80 ? ' ms' : ''}</text>
		{/each}
	</svg>

	<!-- the same press as a journey: down through the iPad, out to the coordinator, and back up -->
	<svg class="scene" viewBox="0 0 860 210" aria-hidden="true">
		<text x="290" y="40" class="tm">t = {t.toFixed(1)} ms</text>
		<text x="290" y="62" class="t2">{stageAt(t)}</text>

		<!-- network: press out, new state back -->
		<line class="w s-idle" x1={WIRE_X0} y1={OUT_Y} x2={COORD.x} y2={OUT_Y} />
		<line class="w s-idle" x1={WIRE_X0 - 8} y1={BACK_Y} x2={COORD.x} y2={BACK_Y} />
		{#if t >= tPress}
			<line
				class="w s-net"
				x1={WIRE_X0}
				y1={OUT_Y}
				x2={WIRE_X0 + (COORD.x - WIRE_X0) * progress(t, tPress, tArrive)}
				y2={OUT_Y}
			/>
		{/if}
		{#if t >= tBroadcast}
			<line
				class="w s-net"
				x1={COORD.x}
				y1={BACK_Y}
				x2={COORD.x - (COORD.x - WIRE_X0 + 8) * progress(t, tBroadcast, tReceive)}
				y2={BACK_Y}
			/>
		{/if}
		<text x="420" y={OUT_Y - 10} text-anchor="middle" class="t3">press →</text>
		<text x="420" y={BACK_Y + 18} text-anchor="middle" class="t3">← new game state</text>

		<!-- coordinator -->
		<rect
			class="station"
			class:reached={t >= tArrive}
			x={COORD.x}
			y={COORD.y}
			width={COORD.w}
			height={COORD.h}
			rx="8"
		/>
		<text x={COORD.x + 48} y={COORD.y + 26} class="tb">Coordinator</text>
		<text x={COORD.x + 48} y={COORD.y + 44} class="t3">physics · 120 steps a second</text>
		<rect class="meter" x={COORD.x + 48} y={COORD.y + 54} width={COORD.w - 64} height="4" rx="2" />
		<rect
			class="f-timer"
			x={COORD.x + 48}
			y={COORD.y + 54}
			width={(COORD.w - 64) * progress(t, tArrive, tBroadcast)}
			height="4"
			rx="2"
		/>

		<!-- the iPad, as a stack of planes -->
		{#each planes as p (p.name)}
			<polygon class="plane" class:reached={t >= p.from} points={plane(p.y)} />
			<text x="66" y={p.y + 4} text-anchor="end" class="t2">{p.name}</text>
		{/each}

		<!-- the paddle, drawn on the glass: it tilts when the light changes -->
		<circle class="f-light" cx={UP_X} cy={glass.y} r="20" opacity={lit ? 0.3 : 0} />
		<line
			class="paddle"
			class:lit
			x1={UP_X - 16}
			y1={glass.y}
			x2={UP_X + 16}
			y2={glass.y}
			transform="rotate({lit ? -18 : 0} {UP_X} {glass.y})"
		/>

		<!-- render, composite, scan out -->
		<rect class="meter" x={UP_X + 10} y={ios.y - 2} width="22" height="4" rx="2" />
		<rect
			class="f-light"
			x={UP_X + 10}
			y={ios.y - 2}
			width={22 * progress(t, tPaint, tPhoton)}
			height="4"
			rx="2"
		/>

		<!-- the press, then the state it turned into -->
		{#if t >= 0}
			<circle class={dotClass} cx={dot[0]} cy={dot[1]} r="11" opacity="0.25" />
			<circle class={dotClass} cx={dot[0]} cy={dot[1]} r="5.5" />
			{#if t >= tReceive && t < tPaint}
				<circle class="estimated" cx={dot[0]} cy={dot[1]} r="11" />
			{/if}
		{/if}

		<text class="finger" x={DOWN_X} y={fingerY} text-anchor="middle">👇</text>
	</svg>

	{#snippet note()}
		<PlaybackControls {playback} />
	{/snippet}

	{#snippet caption()}
		A lot happens each time you touch the screen. Press play to follow one press, slowed down about
		170 times, from the moment your finger lands until the game responds on screen.
	{/snippet}
</TimingFigure>

<style>
	.playhead {
		stroke: var(--color-accent);
		stroke-width: 1.5;
	}

	.station,
	.plane {
		fill: var(--color-surface);
		stroke: var(--color-fg-subtle);
		stroke-width: 1.5;
	}

	.station.reached {
		stroke: var(--timer);
		stroke-width: 2.5;
	}

	.plane {
		fill-opacity: 0.85;
		transition: stroke 0.15s;
	}

	.plane.reached {
		stroke: var(--color-accent);
		stroke-width: 2;
	}

	.meter {
		fill: var(--color-line);
	}

	.paddle {
		stroke: var(--color-fg-subtle);
		stroke-width: 4;
		stroke-linecap: round;
	}

	.paddle.lit {
		stroke: var(--light);
	}

	.estimated {
		fill: none;
		stroke: var(--light);
		stroke-width: 1.5;
		stroke-dasharray: 4 3;
	}

	.scene .finger {
		font-size: 26px;
	}
</style>
