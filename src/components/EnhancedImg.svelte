<script lang="ts">
	/**
	 * Note: Enhanced:img breaks everything, so back to just img
	 * */
	import { page } from '$app/state';
	import { imageToSrc } from '$lib/assets';

	let {
		image,
		figClass = 'max-w-full',
		imgClass = 'rounded-lg object-cover max-w-full w-full',
		captionClass = 'mt-2 text-sm text-center text-fg-muted',
		hideTitle = false,
		path = null,
		// accepted for enhanced:img compatibility, currently unused
		sizes: _sizes = '',
		transform: _transform = []
	}: {
		image: App.EnhancedImageDef;
		figClass?: string;
		imgClass?: string;
		captionClass?: string;
		hideTitle?: boolean;
		path?: string | null;
		sizes?: string;
		transform?: string[];
	} = $props();
	// let srcSuffix = transform.length > 0 ? "?" + transform.join("&") : "";
	// let imgSrc = imageToModuleDefault(image.src + srcSuffix, page.url.pathname, page.data.imageModules);
	let pagePath = (() => path)() || page.url.pathname;
	let imgSrc = imageToSrc((() => image)().src, pagePath);
</script>

<figure class={figClass}>
	<img src={imgSrc} alt={image.alt} class={imgClass + ' ' + (image.extraImgClasses ?? '')} />
	{#if image.title && !hideTitle}
		<figcaption class={captionClass}>{image.title}</figcaption>
	{/if}
</figure>
