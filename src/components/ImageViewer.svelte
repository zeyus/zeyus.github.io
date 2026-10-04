<script lang="ts">
	/**
	 * Shows the post's images as large as the window allows (never past their real size),
	 * grown out of the image that was clicked. One per page, see ImageViewerState.
	 * */
	import { tick, untrack } from 'svelte';
	import { ChevronLeftOutline, ChevronRightOutline, CloseOutline } from 'flowbite-svelte-icons';
	import { getImageViewer, type ViewerImage } from '$lib/image-viewer.svelte';

	const viewer = getImageViewer()!;

	type Rect = { left: number; top: number; width: number; height: number };

	const DURATION = 300;
	const EASING = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
	// space around the image, plus room for the arrows on wide screens and the caption below
	const MARGIN = 16;
	const ARROWS = 64;
	const CAPTION = 64;

	let dialog: HTMLDialogElement;
	let box = $state<HTMLDivElement>();
	let chrome = $state<HTMLDivElement>();
	let shade = $state<HTMLDivElement>();
	let width = $state(0);
	let height = $state(0);
	// what's on screen, which trails viewer.current while the closing animation plays
	let shown = $state.raw<ViewerImage | null>(null);
	// the page's copy of the open image, hidden so it looks like it lifted off the page
	let hiddenThumb: HTMLImageElement | undefined;

	const images = $derived(viewer.images);
	const index = $derived(shown ? images.indexOf(shown) : -1);

	function ratioOf(image: ViewerImage) {
		if (image.width && image.height) return image.width / image.height;
		const thumb = image.thumb();
		return thumb?.naturalWidth ? thumb.naturalWidth / thumb.naturalHeight : 4 / 3;
	}

	/** contain-fit in the window, capped at the image's own size */
	function fit(image: ViewerImage): Rect {
		const ratio = ratioOf(image);
		const sides = width >= 768 ? ARROWS : MARGIN;
		const maxWidth = Math.min(width - 2 * sides, image.width ?? Infinity);
		const maxHeight = Math.min(height - 2 * MARGIN - CAPTION, image.height ?? Infinity);
		const w = Math.min(maxWidth, maxHeight * ratio);
		const h = w / ratio;
		return { left: (width - w) / 2, top: (height - CAPTION - h) / 2, width: w, height: h };
	}

	const target = $derived(shown ? fit(shown) : null);

	/** where the image sits in the page, if any of it is on screen */
	function thumbRect(image: ViewerImage): Rect | null {
		const r = image.thumb()?.getBoundingClientRect();
		if (!r || !r.width || r.bottom < 0 || r.top > height) return null;
		return { left: r.left, top: r.top, width: r.width, height: r.height };
	}

	const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

	async function animate(
		el: Element | undefined,
		keyframes: Keyframe[],
		options: KeyframeAnimationOptions = {}
	) {
		if (!el) return Promise.resolve();
		return el
			.animate(keyframes, {
				duration: reducedMotion() ? 0 : DURATION,
				easing: EASING,
				...options
			})
			.finished.catch(() => undefined);
	}

	const px = (r: Rect) => ({
		left: `${r.left}px`,
		top: `${r.top}px`,
		width: `${r.width}px`,
		height: `${r.height}px`
	});

	function hideThumb(image: ViewerImage) {
		showThumb();
		hiddenThumb = image.thumb();
		if (hiddenThumb) hiddenThumb.style.visibility = 'hidden';
	}

	function showThumb() {
		if (hiddenThumb) hiddenThumb.style.visibility = '';
		hiddenThumb = undefined;
	}

	// bumped on every change, so a slow animation can tell it has been overtaken
	let run = 0;

	async function change(next: ViewerImage | null) {
		const id = ++run;
		const prev = shown;

		if (next && !prev) {
			shown = next;
			await tick();
			if (id !== run) return;
			if (!dialog.open) dialog.showModal();
			const from = thumbRect(next);
			hideThumb(next);
			const to = fit(next);
			animate(shade, [{ opacity: 0 }, { opacity: 1 }]);
			animate(chrome, [{ opacity: 0 }, { opacity: 1 }]);
			await (from
				? animate(box, [px(from), px(to)])
				: animate(box, [
						{ opacity: 0, scale: 0.95 },
						{ opacity: 1, scale: 1 }
					]));
		} else if (next && prev && next !== prev) {
			shown = next;
			hideThumb(next);
			await tick();
			await animate(box, [{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
		} else if (!next && prev) {
			const to = thumbRect(prev);
			const hold = { fill: 'forwards' } as const;
			animate(shade, [{ opacity: 1 }, { opacity: 0 }], hold);
			animate(chrome, [{ opacity: 1 }, { opacity: 0 }], hold);
			await (to && target
				? animate(box, [px(target), px(to)], hold)
				: animate(
						box,
						[
							{ opacity: 1, scale: 1 },
							{ opacity: 0, scale: 0.95 }
						],
						hold
					));
			if (id !== run) return;
			dialog.close();
			showThumb();
			shown = null;
		}
	}

	$effect(() => {
		const next = viewer.current;
		untrack(() => change(next));
	});

	// big enough for the size it's shown at, so the browser picks a sharper variant than the page's
	const sizes = $derived(target ? `${Math.ceil(target.width)}px` : undefined);

	// neighbours are fetched ahead so stepping through doesn't wait on the network
	$effect(() => {
		if (!shown || !sizes || images.length < 2) return;
		for (const by of [1, -1]) {
			const image = images[(index + by + images.length) % images.length];
			const preload = new Image();
			preload.sizes = sizes;
			if (image.srcset) preload.srcset = image.srcset;
			preload.src = image.src;
		}
	});

	function keydown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') viewer.step(1);
		else if (e.key === 'ArrowLeft') viewer.step(-1);
	}

	// a swipe steps, a tap or click (anywhere but the buttons) closes
	let start: { x: number; y: number } | null = null;

	function pointerdown(e: PointerEvent) {
		start = (e.target as Element).closest('button') ? null : { x: e.clientX, y: e.clientY };
	}

	function pointerup(e: PointerEvent) {
		if (!start) return;
		const dx = e.clientX - start.x;
		const dy = e.clientY - start.y;
		start = null;
		if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) viewer.step(dx < 0 ? 1 : -1);
		else if (Math.hypot(dx, dy) < 10) viewer.close();
	}

	function cancel(e: Event) {
		// Escape: close with the animation rather than the dialog vanishing on the spot
		e.preventDefault();
		viewer.close();
	}
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<dialog
	bind:this={dialog}
	class="viewer"
	aria-label={shown?.alt}
	oncancel={cancel}
	onkeydown={keydown}
	onpointerdown={pointerdown}
	onpointerup={pointerup}
	onpointercancel={() => (start = null)}
>
	{#if shown && target}
		<!-- an element rather than ::backdrop: animating the pseudo-element makes Firefox drop
		     the dimming the moment the animation ends -->
		<div bind:this={shade} class="shade"></div>
		<!-- svelte-ignore a11y_no_static_element_interactions (only closes a hover-opened image; the dialog has its own keyboard controls) -->
		<div
			bind:this={box}
			class="box"
			style:left="{target.left}px"
			style:top="{target.top}px"
			style:width="{target.width}px"
			style:height="{target.height}px"
			style:background-image={shown.thumb()?.currentSrc
				? `url("${shown.thumb()?.currentSrc}")`
				: undefined}
			onpointerleave={(e) => {
				if (viewer.byHover && e.pointerType === 'mouse') viewer.close();
			}}
		>
			{#key shown}
				<picture>
					{#if shown.srcset}
						<source type="image/avif" srcset={shown.srcset} {sizes} />
					{/if}
					<img src={shown.src} alt={shown.alt} class={shown.extraClass} />
				</picture>
			{/key}
		</div>

		<div bind:this={chrome} class="chrome">
			<button type="button" class="close" aria-label="Close" onclick={() => viewer.close()}>
				<CloseOutline class="h-7 w-7" />
			</button>
			{#if images.length > 1}
				<button
					type="button"
					class="step prev"
					aria-label="Previous image"
					onclick={() => viewer.step(-1)}
				>
					<ChevronLeftOutline class="h-8 w-8" />
				</button>
				<button
					type="button"
					class="step next"
					aria-label="Next image"
					onclick={() => viewer.step(1)}
				>
					<ChevronRightOutline class="h-8 w-8" />
				</button>
			{/if}
			<p class="caption">
				{#if images.length > 1}
					<span class="count"
						>{String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span
					>
				{/if}
				{#if shown.title}<span class="title">{shown.title}</span>{/if}
			</p>
		</div>
	{/if}
</dialog>

<style>
	dialog.viewer {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100dvh;
		max-width: none;
		max-height: none;
		margin: 0;
		padding: 0;
		border: 0;
		overflow: hidden;
		background: transparent;
		color: #f4f4f5;
		/* pinch-zoom still works, sideways swipes come to us instead of panning */
		touch-action: pinch-zoom;

		&::backdrop {
			background: transparent;
		}
	}

	.shade {
		position: absolute;
		inset: 0;
		background: rgb(0 0 0 / 0.85);
	}

	:global(html:has(dialog.viewer[open])) {
		overflow: hidden;
	}

	.box {
		position: absolute;
		overflow: hidden;
		border-radius: 0.5rem;
		background-position: center;
		background-size: cover;
		box-shadow: 0 1.5rem 4rem -1rem rgb(0 0 0 / 0.8);
		cursor: zoom-out;

		img {
			width: 100%;
			height: 100%;
			max-width: none;
			object-fit: cover;
		}
	}

	.chrome button {
		position: absolute;
		display: grid;
		place-items: center;
		padding: 0.5rem;
		border-radius: 9999px;
		color: inherit;
		background: rgb(0 0 0 / 0.4);
		cursor: pointer;
		transition: background-color 0.2s;

		&:hover,
		&:focus-visible {
			background: var(--color-primary-700);
		}
	}

	.close {
		top: 0.75rem;
		right: 0.75rem;
	}

	.step {
		top: calc(50% - 2rem);
	}

	.prev {
		left: 0.5rem;
	}

	.next {
		right: 0.5rem;
	}

	.caption {
		position: absolute;
		right: 1rem;
		bottom: 0;
		left: 1rem;
		display: flex;
		gap: 1rem;
		justify-content: center;
		align-items: baseline;
		height: 4rem;
		margin: 0;
		padding-top: 0.75rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		line-height: 1.4;
		text-align: center;
	}

	.count {
		flex-shrink: 0;
		color: var(--color-primary-400);
	}

	.title {
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
