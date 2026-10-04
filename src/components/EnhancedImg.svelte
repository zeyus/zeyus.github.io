<script lang="ts">
	/**
	 * Note: Enhanced:img breaks everything, so this is a plain img, plus the AVIF
	 * variants that `pnpm run images` generates (see scripts/images.mjs). Images
	 * without an entry in the manifest are served as-is.
	 * */
	import { page } from '$app/state';
	import { imageToSrc } from '$lib/assets';
	import manifest from '$lib/image-manifest.json';
	import { getImageViewer } from '$lib/image-viewer.svelte';
	import { onMount, untrack } from 'svelte';

	let {
		image,
		figClass = 'max-w-full',
		figId = undefined,
		imgClass = 'rounded-lg object-cover max-w-full w-full',
		captionClass = 'mt-2 text-sm text-center text-fg-muted',
		hideTitle = false,
		path = null,
		// off-screen images are only fetched as they scroll near the viewport
		loading = 'lazy',
		// how wide the image is laid out, so the browser can pick the smallest variant that fits
		sizes = '(min-width: 1024px) 950px, 100vw',
		// 'viewer': click to see it large in ImageViewer (the default inside a post),
		// 'inplace': a cropped image grows out to its whole shape where it is (feature images),
		// false: just the image
		expand = undefined,
		// also expand on mouse hover, not only on click / tap / Enter
		expandOnHover = false,
		// accepted for enhanced:img compatibility, currently unused
		transform: _transform = []
	}: {
		image: App.EnhancedImageDef;
		figClass?: string;
		figId?: string;
		imgClass?: string;
		captionClass?: string;
		hideTitle?: boolean;
		path?: string | null;
		loading?: 'lazy' | 'eager';
		sizes?: string;
		expand?: 'viewer' | 'inplace' | false;
		expandOnHover?: boolean;
		transform?: string[];
	} = $props();
	// let srcSuffix = transform.length > 0 ? "?" + transform.join("&") : "";
	// let imgSrc = imageToModuleDefault(image.src + srcSuffix, page.url.pathname, page.data.imageModules);
	// derived, not computed once: the layout's feature image is the same component from one
	// post to the next, only its props change
	const pagePath = $derived(path || page.url.pathname);
	const imgSrc = $derived(imageToSrc(image.src, pagePath));

	type Variants = { width: number; height: number; widths: number[] };
	const variants = $derived((manifest as Record<string, Variants>)[imgSrc]);
	// 02.jpg -> _r/02-480.avif 480w, _r/02-768.avif 768w, ...
	const srcset = $derived(
		variants?.widths
			.map((w) => `${imgSrc.replace(/([^/]+)\.[^./]+$/, `_r/$1-${w}.avif`)} ${w}w`)
			.join(', ')
	);

	const viewer = getImageViewer();
	const mode = $derived(expand ?? (viewer ? 'viewer' : false));
	let thumb = $state<HTMLImageElement>();

	// one object for the viewer to hold on to, whose getters always give the current image
	const viewerImage = {
		get src() {
			return imgSrc;
		},
		get srcset() {
			return srcset;
		},
		get width() {
			return variants?.width;
		},
		get height() {
			return variants?.height;
		},
		get alt() {
			return image.alt;
		},
		get title() {
			return image.title;
		},
		get extraClass() {
			return image.extraImgClasses;
		},
		thumb: () => thumb
	};

	onMount(() => {
		if (mode === 'viewer' && viewer) return viewer.register(viewerImage);
	});

	let frame = $state<HTMLElement>();
	let expanded = $state(false);
	// width / height of the whole image: from the manifest, or measured once it has loaded
	let measuredRatio = $state(0);
	const ratio = $derived(variants ? variants.width / variants.height : measuredRatio);
	// where object-position pins the image inside the frame (%), which is the point it grows from
	let anchor = $state({ x: 50, y: 50 });
	// nudges the expanded image back on screen when growing in place would push it off (px)
	let shift = $state(0);
	// the touch that closed the image shouldn't reopen it when its click arrives
	let justClosed = false;

	function open() {
		const img = frame?.querySelector('img');
		if (!frame || !img) return;
		if (!ratio) measuredRatio = img.naturalWidth / img.naturalHeight;
		// nothing to reveal unless object-fit is actually cropping the image
		const cropped = Math.abs(frame.clientWidth / frame.clientHeight / ratio - 1) > 0.02;
		if (!ratio || !cropped) return;

		const [x, y] = getComputedStyle(img)
			.objectPosition.split(' ')
			.map((p) => (p.endsWith('%') ? parseFloat(p) : 50));
		anchor = { x, y };

		// same sum as the CSS below: where will the expanded image's top edge end up?
		const viewport = window.innerHeight;
		const height = Math.min(frame.clientWidth / ratio, viewport * 0.9);
		const top = frame.getBoundingClientRect().top + (y / 100) * (frame.clientHeight - height);
		const margin = (viewport - height) / 2;
		const lowest = viewport - height - Math.min(margin, 8);
		shift = Math.min(Math.max(top, Math.min(margin, 8)), lowest) - top;
		expanded = true;
	}

	// a different image (another post's feature image) starts out collapsed
	$effect(() => {
		void imgSrc;
		untrack(() => {
			measuredRatio = 0;
			close();
		});
	});

	function close() {
		expanded = false;
		shift = 0;
	}

	const hover = (enter: boolean) => (e: PointerEvent) => {
		if (e.pointerType === 'mouse') (enter ? open : close)();
	};

	function click() {
		if (!justClosed) (expanded ? close : open)();
	}

	function keydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
		else if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			(expanded ? close : open)();
		}
	}

	// touching anywhere, the image included, puts it back
	function documentPointerDown(e: PointerEvent) {
		justClosed = expanded && e.pointerType !== 'mouse';
		if (justClosed) close();
	}
</script>

<svelte:document onpointerdown={mode === 'inplace' ? documentPointerDown : undefined} />

{#snippet picture()}
	<picture>
		{#if srcset}
			<source type="image/avif" {srcset} {sizes} />
		{/if}
		<img
			bind:this={thumb}
			src={imgSrc}
			alt={image.alt}
			width={variants?.width}
			height={variants?.height}
			{loading}
			decoding="async"
			class={imgClass + ' ' + (image.extraImgClasses ?? '')}
		/>
	</picture>
{/snippet}

<figure id={figId} class={figClass}>
	{#if mode === 'viewer' && viewer}
		<button
			type="button"
			class="zoom"
			aria-label={`Enlarge image: ${image.alt}`}
			onclick={() => viewer.open(viewerImage)}
			onpointerenter={(e) => {
				if (expandOnHover && e.pointerType === 'mouse') viewer.open(viewerImage, true);
			}}
		>
			{@render picture()}
		</button>
	{:else if mode === 'inplace'}
		<!-- takes the image's own classes so it holds the cropped size while the image grows out of it -->
		<div
			bind:this={frame}
			class={['frame', imgClass]}
			class:expanded
			style:--ratio={ratio || undefined}
			style:--anchor-x="{anchor.x}%"
			style:--anchor-y="{anchor.y}%"
			style:--shift="{shift}px"
			role="button"
			tabindex="0"
			aria-expanded={expanded}
			aria-label={`Show the whole image: ${image.alt}`}
			onpointerenter={expandOnHover ? hover(true) : undefined}
			onpointerleave={expandOnHover ? hover(false) : undefined}
			onclick={click}
			onkeydown={keydown}
			onblur={close}
		>
			{@render picture()}
		</div>
	{:else}
		{@render picture()}
	{/if}
	{#if image.title && !hideTitle}
		<figcaption class={captionClass}>{image.title}</figcaption>
	{/if}
</figure>

<style>
	.zoom {
		display: block;
		width: 100%;
		cursor: zoom-in;
	}

	.frame {
		position: relative;
		z-index: 0;
		display: block;
		cursor: zoom-in;
		/* lets the image size itself against the frame's width (cqw) */
		container-type: inline-size;
		/* without a height class of its own the frame keeps the image's shape */
		aspect-ratio: var(--ratio);
		/* stay on top until the image has finished shrinking back */
		transition: z-index 0s 0.3s;

		:global(img) {
			position: absolute;
			/* pinned to the frame at the object-position point, so growing keeps that point still */
			top: var(--anchor-y);
			left: var(--anchor-x);
			translate: calc(-1 * var(--anchor-x)) calc(-1 * var(--anchor-y) + var(--shift));
			width: 100%;
			height: 100%;
			max-width: none;
			transition:
				width 0.3s ease,
				height 0.3s ease,
				translate 0.3s ease,
				box-shadow 0.3s ease;
		}
	}

	.frame.expanded {
		/* over the post, under the navigation */
		z-index: 15;
		transition-delay: 0s;
		cursor: zoom-out;
		/* the image's own shape, as wide as the frame but never taller than the screen */
		:global(img) {
			width: min(100cqw, 90svh * var(--ratio));
			height: min(100cqw / var(--ratio), 90svh);
			box-shadow: 0 1.5rem 3rem -0.75rem rgb(0 0 0 / 0.6);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.frame,
		.frame :global(img) {
			transition: none;
		}
	}
</style>
