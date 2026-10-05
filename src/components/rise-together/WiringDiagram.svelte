<script module lang="ts">
	export type Signal = 'all' | 'gpio' | 'timer' | 'light' | 'net' | 'bio';

	export const filters: { id: Signal; label: string }[] = [
		{ id: 'all', label: 'Everything' },
		{ id: 'gpio', label: 'Paradigm trigger' },
		{ id: 'timer', label: 'Bela timer' },
		{ id: 'light', label: 'Photodiode light' },
		{ id: 'net', label: 'Network & clock sync' },
		{ id: 'bio', label: 'Brain & muscle signals' }
	];

	export const notes: Record<Signal, string> = {
		all: 'Pick a signal above to follow its path.',
		gpio: 'The coordinator’s GPIO output goes to Bela pin 11, and the Bela copies it to pin 13 one block (0.33 ms) later. Pin 13 is one of the Bela’s digital output, which goes through the trigger box and a splitter to every hyperscanner, arriving on trig_in1. This is the route from the game to the EEG.',
		timer:
			'The Bela makes its own jittered pulses on pin 12, from a logged seed. Pin 12 is the other channel of the same stereo cable (2x digital signals, not analogue), so the timer takes the same trigger box and splitter and arrives on trig_in0: an independent check on the forwarded trigger.',
		light:
			'Each iPad flashes a small square in its top-left corner. The photodiode over it plugs into the Bela’s cape with a 3.5 mm jack (pins 0–5), giving the time the light actually appeared. This path never reaches the EEG.',
		net: 'The game runs over the network: physics from the coordinator, button presses back, and a clock-sync probe every 5 s that puts each iPad on the coordinator’s clock. The Bela is networked only for access and doesn’t use it for timing.',
		bio: 'EEG (32 channels across four 500 Hz boards) and EMG (4 channels on one board, at 2 kHz or 500 Hz) go straight into the hyperscanner, which writes them, with its trigger inputs, to its SD card.'
	};
</script>

<script lang="ts">
	import TimingFigure from './TimingFigure.svelte';

	// bindable so a caller can pick the signal from outside
	let { show = $bindable('all') }: { show?: Signal } = $props();
</script>

<TimingFigure id="wiring-diagram">
	{#snippet controls()}
		<div class="filters" role="group" aria-label="Highlight one kind of signal">
			{#each filters as f (f.id)}
				<button type="button" aria-pressed={show === f.id} onclick={() => (show = f.id)}>
					{#if f.id !== 'all'}<i style="background:var(--{f.id})"></i>{/if}{f.label}
				</button>
			{/each}
		</div>
	{/snippet}

	<svg
		class="wiring"
		data-show={show}
		viewBox="0 0 1100 610"
		role="img"
		aria-label="Wiring for one participant station and the central desk. The coordinator's GPIO output goes to the Bela. The Bela's digital outputs carry the forwarded trigger and its own timer through a trigger box and a splitter to every hyperscanner's trigger input, arriving as trig_in1 and trig_in0; the iPad screen's photodiode goes to the Bela; iPads, coordinator, infrastructure Pi and control laptop share a network switch; EEG and EMG electrodes go to the hyperscanner."
	>
		<!-- frames -->
		<rect class="frame" x="16" y="18" width="404" height="576" rx="12" />
		<text x="34" y="44" class="t2" style="font-weight:600">a participant station</text>
		<rect class="frame" x="436" y="18" width="648" height="576" rx="12" />
		<text x="454" y="44" class="t2" style="font-weight:600">shared central desk</text>

		<!-- network wires -->
		<g data-sig="net">
			<path class="w s-net" d="M190 130 H 470 V 82 H 540" />
			<path class="w s-net" d="M545 160 V 130 H 600 V 104" />
			<path class="w s-net" d="M730 160 V 104" />
			<path class="w s-net" d="M965 160 V 82 H 800" />
			<text x="330" y="121" text-anchor="middle" class="t2">game state · clock-sync probes</text>
		</g>
		<path data-sig="net" class="w s-idle" d="M780 330 H 840 V 95 H 800" />
		<text data-sig="net" x="848" y="300" class="t3">ssh only</text>

		<!-- photodiode -->
		<g data-sig="light">
			<path class="w s-light" d="M73 84 V 60 H 215 V 290 H 540 V 345 H 560" />
			<text x="228" y="281" class="t2">photodiode → Bela</text>
		</g>

		<!-- GPIO -->
		<g data-sig="gpio">
			<path class="w s-gpio" d="M500 236 V 420 H 560" />
			<text x="492" y="332" text-anchor="end" class="t2">GPIO wire</text>
			<path class="w s-gpio" d="M664 450 V 500" />
			<path class="w s-gpio" d="M560 524 H 520" />
			<path class="w s-gpio" d="M490 524 H 390" />
		</g>

		<!-- timer -->
		<g data-sig="timer">
			<path class="w s-timer" d="M676 450 V 500" />
			<path class="w s-timer" d="M560 540 H 520" />
			<path class="w s-timer" d="M490 540 H 390" />
		</g>

		<!-- biosignals -->
		<g data-sig="bio">
			<path class="w s-bio" d="M166 392 H 210" />
			<path class="w s-bio" d="M200 497 H 210" />
			<circle cx="130" cy="392" r="36" fill="none" stroke="var(--bio)" stroke-width="2" />
			<circle cx="112" cy="378" r="3" class="f-bio" /><circle
				cx="130"
				cy="370"
				r="3"
				class="f-bio"
			/><circle cx="148" cy="378" r="3" class="f-bio" />
			<circle cx="116" cy="398" r="3" class="f-bio" /><circle
				cx="144"
				cy="398"
				r="3"
				class="f-bio"
			/>
			<text x="130" y="448" text-anchor="middle" class="t2">EEG cap · 32 ch</text>
			<rect
				x="60"
				y="480"
				width="140"
				height="34"
				rx="6"
				fill="var(--color-surface)"
				stroke="var(--bio)"
				stroke-width="2"
			/>
			<text x="130" y="502" text-anchor="middle" class="t2">EMG · 4 ch</text>
		</g>

		<!-- iPad -->
		<rect class="box" x="50" y="70" width="140" height="200" rx="14" />
		<rect class="ground" x="60" y="82" width="120" height="176" rx="4" />
		<rect class="patch" x="66" y="88" width="14" height="14" />
		<text x="120" y="176" text-anchor="middle" class="tb">iPad</text>
		<text x="120" y="196" text-anchor="middle" class="t2">the game · event log</text>
		<text x="120" y="232" text-anchor="middle" class="t3">flash square, top left</text>
		<g data-sig="light">
			<circle cx="73" cy="95" r="11" fill="none" stroke="var(--light)" stroke-width="3" />
			<text x="224" y="74" class="t2">photodiode over the square</text>
		</g>

		<!-- hyperscanner -->
		<rect class="box-strong" x="210" y="340" width="180" height="230" rx="8" />
		<text x="300" y="364" text-anchor="middle" class="tb">Hyperscanner</text>
		<text x="222" y="390" class="t2">EEG · 500 Hz</text>
		<text x="222" y="410" class="t2">EMG · 2 kHz</text>
		<text x="222" y="430" class="t2">IMU · 500 Hz</text>
		<text x="222" y="456" class="t3">writes to its SD card</text>
		<text x="382" y="506" text-anchor="end" class="t3">trigger in</text>
		<text x="382" y="528" text-anchor="end" class="tm">trig_in1</text>
		<text x="382" y="544" text-anchor="end" class="tm">trig_in0</text>
		<text x="222" y="562" class="t3">marker button</text>

		<!-- switch, pis, laptop -->
		<rect class="box" x="540" y="60" width="260" height="44" rx="6" />
		<text x="670" y="87" text-anchor="middle" class="tb">network switch</text>
		<rect class="box" x="460" y="160" width="170" height="76" rx="8" />
		<text x="545" y="190" text-anchor="middle" class="tb">Coordinator · Pi</text>
		<text x="545" y="210" text-anchor="middle" class="t2">runs the game · GPIO out</text>
		<rect class="box" x="650" y="160" width="160" height="76" rx="8" />
		<text x="730" y="190" text-anchor="middle" class="tb">Infrastructure Pi</text>
		<text x="730" y="210" text-anchor="middle" class="t2">NTP · DNS · DHCP</text>
		<rect class="box" x="870" y="160" width="190" height="76" rx="8" />
		<text x="965" y="190" text-anchor="middle" class="tb">Control laptop</text>
		<text x="965" y="210" text-anchor="middle" class="t2">sets up and starts runs</text>

		<!-- Bela -->
		<rect class="box-strong" x="560" y="310" width="220" height="140" rx="8" />
		<text x="670" y="334" text-anchor="middle" class="tb">Bela</text>
		<text x="572" y="352" class="t2">digital I/O cape</text>
		<text x="670" y="385" text-anchor="middle" class="t3">48 kHz · logs every edge</text>
		<text x="572" y="424" class="t2">pin 11 · GPIO in</text>
		<text x="670" y="442" text-anchor="middle" class="tm">2 ch out</text>
		<text x="690" y="480" class="t2">forwarded trigger + timer</text>

		<!-- trigger box and splitter -->
		<rect class="box" x="560" y="500" width="170" height="64" rx="8" />
		<text x="645" y="525" text-anchor="middle" class="tb" style="font-size:13px">trigger box</text>
		<text x="645" y="547" text-anchor="middle" class="tm">2 ch in → 2 ch out</text>
		<rect
			x="490"
			y="514"
			width="30"
			height="36"
			rx="4"
			fill="var(--color-surface)"
			stroke="var(--color-fg-subtle)"
			stroke-width="1.5"
		/>
		<text x="505" y="505" text-anchor="middle" class="t3">splitter</text>
		<path
			d="M498 550 L 486 584 M505 550 V 584 M512 550 L 524 584"
			fill="none"
			stroke="var(--color-fg-subtle)"
			stroke-width="1.5"
			stroke-dasharray="3 3"
		/>
		<text x="532" y="584" class="t3">to the other 5 hyperscanners</text>
	</svg>

	{#snippet note()}
		<p class="path-note" aria-live="polite">{notes[show]}</p>
	{/snippet}

	{#snippet caption()}
		How the devices in the experiment are connected. Each participant has a station (left), and
		every station connects to the central desk (right), so that everything that happens in the game
		can be lined up with the EEG recordings.
	{/snippet}
</TimingFigure>

<style>
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.filters button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0.8rem;
		border: 1px solid var(--color-line);
		border-radius: 999px;
		background-color: var(--color-surface-2);
		color: var(--color-fg);
		font-family: var(--font-mono);
		font-size: 0.75rem;
		line-height: 1;
		cursor: pointer;
	}

	.filters button i {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.filters button[aria-pressed='true'] {
		border-color: var(--color-accent);
		box-shadow: inset 0 0 0 1px var(--color-accent);
		color: var(--color-fg-strong);
	}

	.filters button:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}

	.wiring [data-sig] {
		transition: opacity 0.2s;
	}

	.wiring:not([data-show='all']) [data-sig] {
		opacity: 0.12;
	}

	.wiring[data-show='net'] [data-sig~='net'],
	.wiring[data-show='gpio'] [data-sig~='gpio'],
	.wiring[data-show='timer'] [data-sig~='timer'],
	.wiring[data-show='light'] [data-sig~='light'],
	.wiring[data-show='bio'] [data-sig~='bio'] {
		opacity: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.wiring [data-sig] {
			transition: none;
		}
	}

	.path-note {
		min-height: 4.8em;
		margin: 0.75rem 0 0;
		font-size: 0.85rem;
		line-height: 1.6;
		color: var(--color-fg-muted);
	}
</style>
