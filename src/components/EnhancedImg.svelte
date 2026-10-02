<script lang="ts">
	/**
	 * Note: Enhanced:img breaks everything, so this is a plain img, plus the AVIF
	 * variants that `pnpm run images` generates (see scripts/images.mjs). Images
	 * without an entry in the manifest are served as-is.
	 * */
	import { page } from '$app/state';
	import { imageToSrc } from '$lib/assets';
	import manifest from '$lib/image-manifest.json';

	let {
		image,
		figClass = 'max-w-full',
		imgClass = 'rounded-lg object-cover max-w-full w-full',
		captionClass = 'mt-2 text-sm text-center text-fg-muted',
		hideTitle = false,
		path = null,
		// off-screen images are only fetched as they scroll near the viewport
		loading = 'lazy',
		// how wide the image is laid out, so the browser can pick the smallest variant that fits
		sizes = '(min-width: 1024px) 950px, 100vw',
		// accepted for enhanced:img compatibility, currently unused
		transform: _transform = []
	}: {
		image: App.EnhancedImageDef;
		figClass?: string;
		imgClass?: string;
		captionClass?: string;
		hideTitle?: boolean;
		path?: string | null;
		loading?: 'lazy' | 'eager';
		sizes?: string;
		transform?: string[];
	} = $props();
	// let srcSuffix = transform.length > 0 ? "?" + transform.join("&") : "";
	// let imgSrc = imageToModuleDefault(image.src + srcSuffix, page.url.pathname, page.data.imageModules);
	let pagePath = (() => path)() || page.url.pathname;
	let imgSrc = imageToSrc((() => image)().src, pagePath);

	type Variants = { width: number; height: number; widths: number[] };
	const variants = (manifest as Record<string, Variants>)[imgSrc];
	// 02.jpg -> _r/02-480.avif 480w, _r/02-768.avif 768w, ...
	const srcset = variants?.widths
		.map((w) => `${imgSrc.replace(/([^/]+)\.[^./]+$/, `_r/$1-${w}.avif`)} ${w}w`)
		.join(', ');
</script>

<figure class={figClass}>
	<picture>
		{#if srcset}
			<source type="image/avif" {srcset} {sizes} />
		{/if}
		<img
			src={imgSrc}
			alt={image.alt}
			width={variants?.width}
			height={variants?.height}
			{loading}
			decoding="async"
			class={imgClass + ' ' + (image.extraImgClasses ?? '')}
		/>
	</picture>
	{#if image.title && !hideTitle}
		<figcaption class={captionClass}>{image.title}</figcaption>
	{/if}
</figure>
