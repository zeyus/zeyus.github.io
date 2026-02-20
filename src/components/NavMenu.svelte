<script lang="ts">
	import { page } from '$app/state';
	import { sineIn } from 'svelte/easing';
	import { Navbar, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import type { MetadataContext } from "$lib/metadata.svelte";
	import { getContext } from "svelte";
	import BreadcrumbTrail from './BreadcrumbTrail.svelte';

    let metaCtx = getContext<MetadataContext>('metadata');

	let menuItems: { name: string; path: string }[] = [];

	// only get top level routes
	const rootPages = import.meta.glob('../routes/*/+page.svelte');
	menuItems.push({
		name: 'home',
		path: '/'
	});
	for (const path in rootPages) {
		const name = path.split('/').slice(-2)[0];
		if (name === 'violin') continue;
		let cleanPath = (name === 'routes' ? '' : name);
		if (!cleanPath.startsWith('/')) {
			cleanPath = '/' + cleanPath;
		}
		if (!cleanPath.endsWith('/')) {
			cleanPath += '/';
		}
		menuItems.push({
			name: name,
			path: cleanPath
		});
	}
	menuItems.push({
		name: 'find me',
		path: 'https://me.zys.im/'
	});


	let slideParams = { delay: 50, duration: 150, easing: sineIn };

	// in this case the active url should only be the first part of the url (or  / if it's the home page)
	let activeUrl = $derived((page.url.pathname.length > 1 && page.url.pathname.split('/').length > 1) ? '/' + page.url.pathname.split('/')[1] + '/' : '/');

</script>
<div id="fixedNavWrapper" class="relative w-full h-11 md:h-14 z-30">
    <!-- pseudo app top bar -->
     <div class="rounded-t-md top-0 start-0 w-full h-5 bg-primary-700 dark:bg-zinc-800 z-20">
        <!-- centered site name and page title -->
        <div class="container mx-auto h-full flex items-center justify-center">
            <span id="nav-prompt" class="text-gray-700 dark:text-gray-400 text-sm">&nbsp;anon@zeyus&nbsp;</span>
            <BreadcrumbTrail />
            <span class="text-gray-700 dark:text-gray-400 text-sm" id="nav-title">$</span>
        </div>
    </div>
	{/* @ts-ignore */ null}
	<Navbar fluid={false}
        navContainerClass="flex-nowrap relative content-center rounded h-0 md:h-4 flex-row items-center"
        class="bg-transparent dark:bg-zinc-700 px-2 py-0 pt-0 mt-0 md:px-4 h-0 md:h-6 relative w-full z-20 top-0 start-0 whitespace-nowrap border-b-0 md:border-b-2 shadow border-primary-700 dark:border-primary-950">
			<!-- <NavBrand href="/" class="self-center justify-self-start flex flex-row shrink w-5/6 md:w-1/2 lg:w-2/3 xl:w-3/4 xxl:w-4/5">
				<Img src="/images/zeyusdotcom@2x.png" srcset="/images/zeyusdotcom.png 1x, /images/zeyusdotcom@2x.png 2x, /images/zeyusdotcom@3x.png 3x" class="min-w-max max-w-max mr-3 h-6 sm:h-9" alt="zeyus dot com Logo" />
				<span id="nav-title" class="self-center max-w-max min-w-4 shrink whitespace-nowrap truncate text-left text-xl font-semibold dark:text-white"
					>{metaCtx.title(false)}</span
				>
			</NavBrand> -->
			<NavHamburger
                size="xs"
                class="absolute h-3 w-3 end-0 -mt-5 md:hidden bg-primary-600 dark:bg-primary-600 text-white rounded-none justify-self-end"
                classes={{ menu: "h-3 w-3" }}
                />
			<NavUl
			    {activeUrl}
			    {slideParams}
				class="absolute end-0 top-0 md:top-0 w-auto md:min-w-min md:max-w-max md:relative md:grow md:flex md:flex-row md:visible justify-self-end md:end-0 md:top-auto md:h-4 z-100 text-right"
				classes={{ul: "dark:bg-zinc-800 pe-1 pb-0 pt-3 md:px-0 md:py-1 rounded-none md:flex md:dark:divide-none md:dark:bg-transparent md:items-stretch md:h-4 md:flex-row md:space-x-4 dark:md:border-0 md:justify-self-end md:border-0 w-full md:flex-nowrap items-center" }}
			>
				{#each menuItems as item}
					<NavLi href={item.path}
                        class="nav-item dark:hover:bg-transparent my-auto w-full h-full ps-0 pt-0 md:p-0 md:border-none bg-transparent md:align-middle align-bottom md:flex md:self-center h-8 md:h-4 text-sm/[1]"
                        activeClass="active dark:text-primary-200 font-bold text-lg text-primary-500 w-full"
                        nonActiveClass="w-full">{item.name}</NavLi>
				{/each}
			</NavUl>
	</Navbar>
</div>
<style>
	#nav-title, #nav-prompt {
		font-family: 'Mechanical Bold', monospace;
	}

    #fixedNavWrapper :global(.nav-item) {
        font-family: 'Mechanical Bold', monospace;
    }

	#fixedNavWrapper :global(li .active::before) {
		content: '> ';
	}

</style>
