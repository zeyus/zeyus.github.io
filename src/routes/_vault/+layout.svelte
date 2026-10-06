<script lang="ts">
	import { page } from '$app/state';
	import type { LayoutData } from './$types';
	import { Heading } from 'flowbite-svelte';
	import { imageToSrc } from '#lib/assets.js';
	import { type Snippet } from 'svelte';
	import PostSidebar from '$components/PostSidebar.svelte';

	import EnhancedImg from '$components/EnhancedImg.svelte';
	import ImageViewer from '$components/ImageViewer.svelte';
	import { ImageViewerState, setImageViewer } from '#lib/image-viewer.svelte.js';

	import { getContext, tick } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import type { MetadataContext } from '#lib/metadata.svelte.js';

	let metaCtx = getContext<MetadataContext>('metadata');

	// post images open large in ImageViewer when clicked
	setImageViewer(new ImageViewerState());

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	$effect(() => {
		metaCtx.setMetadata({
			title: '_vault: ' + page.data.props.title,
			description: page.data.props.excerpt,
			ogImage: page.data.props.feature_image?.src
				? imageToSrc(page.data.props.feature_image.src, page.url.pathname)
				: undefined,
			date: page.data.props.date
		});
	});

	// rough reading time from the rendered post body (~230 wpm)
	let postBody: HTMLElement | undefined = $state();
	let readMinutes: number | null = $state(null);

	afterNavigate(async ({ shallow }) => {
		if (shallow) return;

		await tick();
		const words = postBody?.innerText.trim().split(/\s+/).length ?? 0;
		readMinutes = words ? Math.max(1, Math.round(words / 230)) : null;
	});

	// figure numbers are set here
	function numberFigures(article: HTMLElement | null | undefined) {
		if (!article) return;
		const figures = [...article.querySelectorAll('figure')];
		const label = (i: number) => String(i + 1).padStart(2, '0');
		figures.forEach((figure, i) => figure.style.setProperty('--fig', `'${label(i)}'`));
		// <Ref to="id" /> links get the number of the figure they point at
		for (const ref of article.querySelectorAll<HTMLAnchorElement>('a[data-fig-ref]')) {
			const figure = document.getElementById(ref.hash.slice(1))?.closest('figure');
			const i = figure ? figures.indexOf(figure) : -1;
			const text = `fig.${i < 0 ? '??' : label(i)}`;
			// only when it changes: writing it is itself a mutation the observer below would see
			if (ref.textContent !== text) ref.textContent = text;
		}
	}

	// renumber whenever the post's content changes: navigation, and hot reloads while editing
	$effect(() => {
		const article = postBody?.closest('article');
		if (!article) return;
		numberFigures(article);
		const observer = new MutationObserver(() => numberFigures(article));
		observer.observe(article, { childList: true, subtree: true });
		return () => observer.disconnect();
	});

	let slug = $derived(page.url.pathname.split('/').filter(Boolean).at(-1));
	// the index is a listing, not a post: no reading column or reading time
	let isIndex = $derived(slug === '_vault');

	// make date human readable
	const dateOptions: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
</script>

<!-- on 2xl the sidebar is a sticky column here; below that it's a slide-out drawer -->
<div class="flex flex-row 2xl:gap-10">
	<PostSidebar sidebarItems={data.posts} />
	<article class="mx-auto w-full 2xl:w-(--article-max)">
		<div class="mb-4 flex w-full flex-row flex-wrap justify-between">
			<Heading
				class="post-title mb-0 max-w-max text-3xl/tight! wrap-anywhere sm:text-4xl/tight! md:text-5xl/tight!"
				>{page.data.props.title}</Heading
			>

			<span class="post-meta self-end font-mono text-xs text-fg-subtle">
				<span class="text-accent">$</span>

				stat {slug} → {new Date(page.data.props.date).toLocaleDateString(
					undefined,
					dateOptions
				)}{#if readMinutes && !isIndex}
					· ~{readMinutes} min read
				{/if}
			</span>
		</div>
		{#if page.data.props.feature_image && page.data.props.feature_image?.src && page.data.props.feature_image?.alt}
			<EnhancedImg
				figId="feature-image"
				sizes="min(1200px, 100vw)"
				loading="eager"
				expand="inplace"
				transform={['h=384', 'fit=cover']}
				image={page.data.props.feature_image}
				figClass="max-w-full mb-8"
				imgClass={page.data.props.feature_image?.class ??
					'rounded-lg object-cover max-w-full w-full h-96'}
			/>
		{/if}

		<div class:post-body={!isIndex} style:--post-slug={`"${slug}"`} bind:this={postBody}>
			{@render children()}
		</div>
	</article>
</div>

<ImageViewer />
