<script lang="ts">
    import { page } from '$app/state';
    import type { LayoutData } from './$types';
    import { Heading } from "flowbite-svelte";
    import { imageToSrc } from '$lib/assets';
    import { type Snippet } from 'svelte';
    import PostSidebar from "$components/PostSidebar.svelte";

    import EnhancedImg from '$components/EnhancedImg.svelte';

    import { getContext } from "svelte";
	import type { MetadataContext } from "$lib/metadata.svelte";

    let metaCtx = getContext<MetadataContext>('metadata');

    let { data, children }: { data: LayoutData, children: Snippet } = $props();

    $effect(() => {
        metaCtx.setMetadata({
            title: "_vault: " + page.data.props.title,
            description: page.data.props.excerpt,
            ogImage: page.data.props.feature_image?.src ? imageToSrc(page.data.props.feature_image.src, page.url.pathname) : undefined,
            date: page.data.props.date
        });
    });
    
    // make date human readable
    const dateOptions: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
</script>
<div class="flex flex-row">
    <PostSidebar sidebarItems={data.posts} />
    <div class="w-0 d-none 2xl:w-64 2xl:block">
        <!-- spacer to account for the sidebar -->
    </div>
    <article class="w-full 2xl:w-(--article-max) mx-auto">
        <div class="flex flex-wrap flex-row mb-4 w-full justify-between">
            <Heading class="mb-0 max-w-max">{ page.data.props.title }</Heading>
            <span class="date whitespace-nowrap self-end text-gray-500">Published on: { new Date(page.data.props.date).toLocaleDateString(undefined, dateOptions) }</span>
        </div>
        {#if page.data.props.feature_image && page.data.props.feature_image?.src && page.data.props.feature_image?.alt}
            <EnhancedImg sizes="min(1200, 100vw)" transform={["h=384", "fit=cover"]} image={page.data.props.feature_image} figClass="max-w-full mb-8" imgClass="rounded-lg object-cover max-w-full w-full h-96" />
        {/if}

        {@render children()}
    </article>
</div>
