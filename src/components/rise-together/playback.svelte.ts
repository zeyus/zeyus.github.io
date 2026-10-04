/**
 * A scrubbable clock for the timing figures: `t` runs from `start` to `end` (in the figure's own
 * units) over `seconds` of real time. It starts paused and never plays on its own.
 */
export class Playback {
	t = $state(0);
	playing = $state(false);

	readonly start: number;
	readonly end: number;
	readonly seconds: number;

	#frame = 0;
	#last = 0;

	constructor({ start, end, seconds }: { start: number; end: number; seconds: number }) {
		this.start = start;
		this.end = end;
		this.seconds = seconds;
		this.t = start;
	}

	#tick = (now: number) => {
		// frames stop while the tab is hidden; don't leap ahead when it comes back
		const elapsed = Math.min(0.1, (now - this.#last) / 1000);
		this.#last = now;
		this.t = Math.min(this.end, this.t + (elapsed * (this.end - this.start)) / this.seconds);
		if (this.t >= this.end) {
			this.playing = false;
			return;
		}
		this.#frame = requestAnimationFrame(this.#tick);
	};

	play = () => {
		if (this.playing) return;
		if (this.t >= this.end) this.t = this.start;
		this.playing = true;
		this.#last = performance.now();
		this.#frame = requestAnimationFrame(this.#tick);
	};

	pause = () => {
		this.playing = false;
		// also called on teardown during prerendering, where there are no animation frames
		if (this.#frame) cancelAnimationFrame(this.#frame);
		this.#frame = 0;
	};

	toggle = () => (this.playing ? this.pause() : this.play());

	/** Jump to a time; dragging the scrubber should not fight the clock, so this pauses. */
	seek = (t: number) => {
		this.pause();
		this.t = Math.min(this.end, Math.max(this.start, t));
	};
}

/** How far `t` is through the leg `from`..`to`, clamped to 0..1. */
export const progress = (t: number, from: number, to: number) =>
	Math.min(1, Math.max(0, (t - from) / (to - from)));

export type Point = [x: number, y: number];

/** The point a fraction `f` (0..1) of the way along a polyline. */
export const pointAlong = (points: Point[], f: number): Point => {
	const lengths = points
		.slice(1)
		.map(([x, y], i) => Math.hypot(x - points[i][0], y - points[i][1]));
	let remaining = Math.min(1, Math.max(0, f)) * lengths.reduce((a, b) => a + b, 0);
	for (let i = 0; i < lengths.length; i++) {
		if (remaining <= lengths[i] || i === lengths.length - 1) {
			const k = lengths[i] ? remaining / lengths[i] : 0;
			const [x0, y0] = points[i];
			const [x1, y1] = points[i + 1];
			return [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k];
		}
		remaining -= lengths[i];
	}
	return points[0];
};
