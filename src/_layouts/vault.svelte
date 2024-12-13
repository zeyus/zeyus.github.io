<script context="module">
    import p from "../components/typo/p.svelte";
    import h1 from "../components/typo/h1.svelte";
    export { p, h1 };
</script>
<script lang="ts">
    import { Heading, P, Drawer, CloseButton, Button, Carousel, Thumbnails, Img } from "flowbite-svelte";
    import type { HTMLImgAttributes } from 'svelte/elements';
    import { BarsOutline, ChevronRightOutline } from "flowbite-svelte-icons";
    import { title as t } from "$lib/store.ts";
    import { onMount } from 'svelte';
    import PostSidebar from "../components/PostSidebar.svelte";
    export let title: string;
    export let date: string;
    export let feature_image: HTMLImgAttributes | undefined;
    export let gallery: VaultGallery | undefined;

    let index = 0;
    let forward = true;
    let gallery_position: string = "none";
    let images: HTMLImgAttributes[] = [];
    if (gallery && gallery.position) {
        gallery_position = gallery.position;
        images = gallery.images;
    } else if (gallery) {
        gallery_position = "start";
        images = gallery.images;
    }

    t.set("vault: " + title);

    // make date human readable
    let d: Date = new Date(date);
    let options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    date = d.toLocaleDateString(undefined, options);

    import { sineIn } from 'svelte/easing';

	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
    let breakPoint: number = 1280;
    let backdrop: boolean = false;
	let width: number;
	let activateClickOutside = true;
    let drawerHidden: boolean = false;
    $: if (width >= breakPoint) {
		drawerHidden = false;
		activateClickOutside = false;
	} else {
		drawerHidden = true;
		activateClickOutside = true;
	}

    const observerOptions = {
        attributes: true,
        attributeOldValue: false,
        attributeFilter: ["class"],
        childList: true,
        subtree: true
    };

    const imgClassChange = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // make sure the mutation is on the img element
            if (mutation.target instanceof HTMLImageElement) {
                // if the img element has a new class
                if (mutation.target.classList.contains("outline")) {
                    // find parent .thumbnails element
                    const parent = mutation.target.closest(".thumbnails");
                    
                    if (parent && parent instanceof HTMLElement) {
                        // make sure the selected element is visible
                        // smooth scroll to the selected element
                        const scrollTarget = Math.max(mutation.target.offsetLeft - parent.offsetWidth, 0);
                        parent.scrollTo({
                            left: scrollTarget,
                            behavior: "smooth"
                        });
                    }
                }
            }
        });
    });




	onMount(() => {
		if (width >= breakPoint) {
			drawerHidden = false;
			activateClickOutside = false;
		} else {
			drawerHidden = true;
			activateClickOutside = true;
		}

        const img = document.querySelector(".thumbnails");
        if (img) {
            imgClassChange.observe(img, observerOptions);
        }

	});
    const toggleSide = () => {
		if (width < breakPoint) {
			drawerHidden = !drawerHidden;
		}
	};

    

</script>
<svelte:window bind:innerWidth={width} />
<Button
    on:click={() => (drawerHidden = false)} 
    class="focus:outline-none fixed start-0 top-24 whitespace-normal focus:ring-2 p-0 focus:ring-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 my-0 rounded-none mx-0 xl:hidden">
    <ChevronRightOutline class="w-8 h-8" />
</Button>
<Drawer
	transitionType="fly"
    {backdrop}
	{transitionParams}
	bind:hidden={drawerHidden}
	bind:activateClickOutside
    divClass="overflow-y-auto z-50 p-0 bg-white dark:bg-transparent"
    leftOffset="top-20 start-0 bottom-16"
	width="w-64"
	class="overflow-auto pb-32"
	id="sidebar"
>
    <div class="fixed flex w-64 items-right">
        <CloseButton on:click={() => (drawerHidden = true)} class="right-0 dark:text-white xl:hidden" />
    </div>
    <PostSidebar />
</Drawer>
<div class="flex px-4 mx-auto w-full">
    <article class="xl:ml-72 w-full mx-auto">
        <Heading>{ title }</Heading>
        {#if feature_image && feature_image?.src && feature_image?.alt}
            <Img src={feature_image.src} caption={feature_image.alt} alt={feature_image.alt} imgClass="rounded-lg object-cover w-full" size="max-w-full w-full h-96" figClass="max-w-full" />
        {/if}

        <P class="date">Published on: { date }</P>

        <slot />

        {#if gallery_position === "end"}
            <div class="gallery-wrapper max-w-4xl space-y-4 m-auto">
                <Carousel class="h-64 sm:h-64 md:h-64 lg:h-128 xl:h-192 2xl:h-192" imgClass="object-fit object-contain object-center" images={images} {forward} slideDuration={250} duration={3900} let:Controls bind:index>
                    <Controls />  
                </Carousel>
                <Thumbnails class="thumbnails bg-transparent overflow-hidden overflow-x-scroll gap-3 w-full flex-nowrap" bind:index let:image let:selected let:Thumbnail {images} {forward} >
                    <Thumbnail {...image} {selected} class="object-cover flex flex-0 h-16 w-16 p-0 m-1 rounded-md shadow-xl hover:outline hover:outline-primary-500" activeClass="outline outline-primary-400"/>
                </Thumbnails>
            </div>
        {/if}
    </article>
</div>
<style>
    .gallery-wrapper :global(.thumbnails) {
        justify-content: left;
        /* style x scrollbar */
        scrollbar-width: thin;
        scrollbar-color: var(--color-text) var(--color-background);
        
    }
    .gallery-wrapper :global(.thumbnails button) {
        display:flex;
        width: max-content;
        flex: 0 0 auto;
    }
    .gallery-wrapper :global(.thumbnails button img) {
        flex: 0 0 auto;
    }
</style>
