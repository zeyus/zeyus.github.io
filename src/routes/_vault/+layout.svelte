<script lang="ts">
	import { page } from '$app/state';
	import type { LayoutData } from './$types';
	import { Heading } from 'flowbite-svelte';
	import { imageToSrc } from '$lib/assets';
	import { type Snippet } from 'svelte';
	import PostSidebar from '$components/PostSidebar.svelte';

	import EnhancedImg from '$components/EnhancedImg.svelte';

	import { getContext, tick } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import type { MetadataContext } from '$lib/metadata.svelte';

	let metaCtx = getContext<MetadataContext>('metadata');

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
	afterNavigate(async () => {
		await tick();
		const words = postBody?.innerText.trim().split(/\s+/).length ?? 0;
		readMinutes = words ? Math.max(1, Math.round(words / 230)) : null;
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

<div class="flex flex-row">
	<PostSidebar sidebarItems={data.posts} />
	<div class="d-none w-0 2xl:block 2xl:w-72">
		<!-- spacer to account for the sidebar -->
	</div>
	<article class="mx-auto w-full 2xl:w-(--article-max)">
		<div class="mb-4 flex w-full flex-row flex-wrap justify-between">
			<Heading class="post-title mb-0 max-w-max">{page.data.props.title}</Heading>
			<span class="post-meta self-end font-mono text-xs text-fg-subtle"
				><span class="text-accent">$</span> stat {slug} → {new Date(
					page.data.props.date
				).toLocaleDateString(undefined, dateOptions)}{#if readMinutes && !isIndex}
					· ~{readMinutes} min read{/if}</span
			>
		</div>
		{#if page.data.props.feature_image && page.data.props.feature_image?.src && page.data.props.feature_image?.alt}
			<EnhancedImg
				sizes="min(1200, 100vw)"
				transform={['h=384', 'fit=cover']}
				image={page.data.props.feature_image}
				figClass="max-w-full mb-8"
				imgClass="rounded-lg object-cover max-w-full w-full h-96"
			/>
		{/if}

		<div class:post-body={!isIndex} bind:this={postBody}>
			{@render children()}
		</div>
	</article>
</div>
