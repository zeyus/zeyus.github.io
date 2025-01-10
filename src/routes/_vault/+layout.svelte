<script lang="ts">
    import { page } from '$app/state';
    import type { LayoutData } from './$types';
    import { Heading, Drawer, CloseButton, Button } from "flowbite-svelte";
    import { ChevronRightOutline } from "flowbite-svelte-icons";
    import { imageToSrc } from '$lib/assets';
    import { onMount, type Snippet } from 'svelte';
    import PostSidebar from "$components/PostSidebar.svelte";
    import { sineIn } from 'svelte/easing';

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

	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
    let breakPoint: number = 1280;
    let backdrop: boolean = false;
	let width: number = $state(0);
	let activateClickOutside = $state(true);
    let drawerHidden: boolean = $state(false);
    $effect(() => {
        if (width >= breakPoint) {
            drawerHidden = false;
            activateClickOutside = false;
        } else {
            drawerHidden = true;
            activateClickOutside = true;
        }
    });

    const observerOptions = {
        attributes: true,
        attributeOldValue: false,
        attributeFilter: ["class"],
        childList: true,
        subtree: true
    };

	onMount(() => {
		if (width >= breakPoint) {
			drawerHidden = false;
			activateClickOutside = false;
		} else {
			drawerHidden = true;
			activateClickOutside = true;
		}

	});
</script>
<svelte:window bind:innerWidth={width} />
<Button
    on:click={() => (drawerHidden = false)} 
    class="focus:outline-none fixed start-0 top-1/2 whitespace-normal focus:ring-2 p-0 focus:ring-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 my-0 rounded-none mx-0 xl:hidden">
    <ChevronRightOutline class="w-6 h-8" />
</Button>
<Drawer
	transitionType="fly"
    {backdrop}
	{transitionParams}
	bind:hidden={drawerHidden}
	bind:activateClickOutside
    divClass="overflow fixed-y-auto xl:relative my-auto flex flex-row xl:flex-col z-50 p-0 bg-white dark:bg-transparent top-32 bottom-32 xl:float-left xl:mt-10 xl:z-0 xl:top-0 xl:bottom-0"
    leftOffset="my-auto start-0 min-h-max"
	width="w-64"
	class="overflow-auto my-auto start-0 min-h-max self-center"
	id="sidebar"
>
    <div class="flex">
        <div class="fixed xl:relative flex w-64 items-right">
            <CloseButton on:click={() => (drawerHidden = true)} class="right-0 dark:text-white xl:hidden" />
        </div>
        <PostSidebar sidebarItems={data.posts} />
    </div>
</Drawer>
<div class="flex px-4 mx-auto w-full xl:w-auto">
    <article class="w-full mx-auto">
        <div class="flex flex-wrap flex-row mb-4 w-full justify-between">
            <Heading class="mb-0 max-w-max">{ page.data.props.title }</Heading>
            <span class="date whitespace-nowrap self-end text-gray-500">Published on: { new Date(page.data.props.date).toLocaleDateString(undefined, dateOptions) }</span>
        
        </div>
        {#if page.data.props.feature_image && page.data.props.feature_image?.src && page.data.props.feature_image?.alt}
            <EnhancedImg sizes="min(1280, 100vw)" transform={["h=384", "fit=cover"]} image={page.data.props.feature_image} figClass="max-w-full mb-8" imgClass="rounded-lg object-cover max-w-full w-full h-96" />
        {/if}

        {@render children()}
    </article>
    
</div>
