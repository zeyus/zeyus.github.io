<script lang="ts">
    import { page } from '$app/state';
    import { setContext } from 'svelte';

    import { Heading, P, Drawer, CloseButton, Button, Carousel, Thumbnails, Img } from "flowbite-svelte";
    import type { HTMLImgAttributes } from 'svelte/elements';
    import { ChevronRightOutline } from "flowbite-svelte-icons";
    import { title as t } from "$lib/store.ts";
    import { onMount } from 'svelte';
    import PostSidebar from "../../components/PostSidebar.svelte";
    import Bibliography from '../../components/Bibliography.svelte';

    let { children } = $props();

    let gallery: VaultGallery | undefined = page.data.props.gallery;
    let items: Footnote[] = $state([]);
    setContext('bibItems', () => items);
    
    let index = $state(0);
    let forward = true;
    let gallery_position: string = $state("none");
    let images: HTMLImgAttributes[] = $state([]);
    if (page.data.props.gallery && page.data.props.gallery.position) {
        gallery_position = page.data.props.gallery.position;
        images = page.data.props.gallery.images;
    } else if (gallery) {
        gallery_position = "start";
        images = page.data.props.gallery.images;
    }

    t.set("_vault: " + page.data.props.title);

    // make date human readable
    
    const dateOptions: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };


    import { sineIn } from 'svelte/easing';

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


    let pEl: HTMLParagraphElement | undefined

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

        // create a div under each img element within the carousel
        // this div will be used to display the image caption
        const caroselDiv = document.querySelector(".c-inner");
        const divEl = document.createElement("div");
        divEl.classList.add("absolute", "inset-x-[5%]", "bottom-16", "align-middle", "hidden", "py-1", "text-center", "text-white", "md:block", "text-lg", "caption", "bg-black", "bg-opacity-50", "rounded-lg");
        // add p inside the div
        pEl = document.createElement("p");
        pEl.classList.add("m-0", "p-0");
        divEl.appendChild(pEl);
        caroselDiv?.appendChild(divEl);

	});

    $effect(() => {
        // get alt text based on index
        const altText = images[index].alt || "";
        // set the alt text to the p element
        if (pEl) pEl.textContent = altText;
        
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
    class="focus:outline-none fixed start-0 top-1/2 whitespace-normal focus:ring-2 p-0 focus:ring-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 my-0 rounded-none mx-0 xl:hidden">
    <ChevronRightOutline class="w-6 h-8" />
</Button>
<Drawer
	transitionType="fly"
    {backdrop}
	{transitionParams}
	bind:hidden={drawerHidden}
	bind:activateClickOutside
    divClass="overflow fixed-y-auto my-auto flex flex-row z-50 p-0 bg-white dark:bg-transparent top-32 bottom-32"
    leftOffset="my-auto start-0 min-h-max"
	width="w-64"
	class="overflow-auto my-auto start-0 min-h-max self-center"
	id="sidebar"
>
    <div class="flex">
        <div class="fixed flex w-64 items-right">
            <CloseButton on:click={() => (drawerHidden = true)} class="right-0 dark:text-white xl:hidden" />
        </div>
        <PostSidebar />
    </div>
</Drawer>
<div class="flex px-4 mx-auto w-full">
    <article class="xl:ml-72 w-full mx-auto">
        <Heading>{ page.data.props.title }</Heading>
        {#if page.data.props.feature_image && page.data.props.feature_image?.src && page.data.props.feature_image?.alt}
            <Img src={page.data.props.feature_image.src} caption={page.data.props.feature_image.alt} alt={page.data.props.feature_image.alt} imgClass="rounded-lg object-cover w-full" size="max-w-full w-full h-96" figClass="max-w-full" />
        {/if}

        <P class="date">Published on: { new Date(page.data.props.date).toLocaleDateString(undefined, dateOptions) }</P>

        {@render children()}

        {#if page.data.props.gallery?.position === "end"}
            <div class="gallery-wrapper max-w-4xl space-y-4 m-auto">
                <Carousel class="h-64 sm:h-64 md:h-64 lg:h-128 xl:h-192 2xl:h-192 c-inner" imgClass="object-fit object-contain object-center" images={page.data.props.gallery.images} {forward} slideDuration={250} duration={3900} let:Controls bind:index>
                    <Controls />  
                </Carousel>
                <Thumbnails class="thumbnails bg-transparent overflow-hidden overflow-x-scroll gap-3 w-full flex-nowrap"  bind:index let:image let:selected let:Thumbnail images={page.data.props.gallery.images} {forward} >
                    <Thumbnail {...image} {selected} class="object-cover flex flex-0 h-16 w-16 p-0 m-1 rounded-md shadow-xl hover:outline hover:outline-primary-500" activeClass="outline outline-primary-400"/>
                </Thumbnails>
            </div>
        {/if}
        <Bibliography />
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
