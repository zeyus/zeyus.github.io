<script lang="ts">
	import { page } from '$app/state';
	import { sineIn } from 'svelte/easing';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
  	import { Img } from 'flowbite-svelte';
	import type { MetadataContext } from "$lib/metadata.svelte";
	import { getContext } from "svelte";

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
	let hideNav = $state(true);
	const onHamburgerClick = () => {
        hideNav = !hideNav;
    };
	const onMenuItemClick = () => {
		hideNav = true;
	};

	let slideParams = { delay: 50, duration: 150, easing: sineIn };

	// in this case the active url should only be the first part of the url (or  / if it's the home page)
	let activeUrl = $derived((page.url.pathname.length > 1 && page.url.pathname.split('/').length > 1) ? '/' + page.url.pathname.split('/')[1] + '/' : '/');

</script>
<div id="fixedNavWrapper" class="relative w-full h-11 sm:h-14">
	{/* @ts-ignore */ null}
	<Navbar let:NavContainer fluid={true} navContainerClass="max-w-full mt-0 flex-nowrap pt-0 content-center" class="px-2 py-0 pt-0 mt-0 sm:px-4 h-11 sm:h-14 fixed w-full z-20 top-0 start-0 whitespace-nowrap border-b shadow border-gray-700 dark:border-gray-700">
		<NavContainer class="flex-nowrap relative content-center h-11 sm:h-14 flex-row items-center">
			<NavBrand href="/" class="self-center justify-self-start flex flex-row shrink w-5/6 md:w-1/2 lg:w-2/3 xl:w-3/4 xxl:w-4/5">
				<Img src="/images/zeyusdotcom@2x.png" srcset="/images/zeyusdotcom.png 1x, /images/zeyusdotcom@2x.png 2x, /images/zeyusdotcom@3x.png 3x" class="min-w-max max-w-max mr-3 h-6 sm:h-9" alt="zeyus dot com Logo" />
				<span id="nav-title" class="self-center max-w-max min-w-4 shrink whitespace-nowrap truncate text-left text-xl font-semibold dark:text-white"
					>{metaCtx.title(false)}</span
				>
			</NavBrand>
			<NavHamburger onClick={() => onHamburgerClick()} class="end-2 md:hidden bg-primary-600 dark:bg-primary-600 text-white rounded-none justify-self-end" />
			<NavUl
			    {activeUrl}
			    {slideParams}
				bind:hidden={hideNav}
				class="absolute end-0 top-11 sm:top-14 w-auto md:min-w-min md:max-w-max md:relative md:grow md:flex md:flex-row md:visible justify-self-end md:end-0 md:top-auto md:h-full z-100 text-right"
				ulClass="md:flex md:h-full md:flex-row md:space-x-4 dark:md:border-0 md:justify-self-end md:border-0 md:w-full md:flex-nowrap items-center"
				on:click={() => onMenuItemClick()}
			>
				{#each menuItems as item}
					<NavLi href={item.path} bind:hidden={hideNav} class="my-auto md:mt-7 align-bottom h-11 md:h-14 md:flex" activeClass="active dark:text-primary-500 font-bold text-lg text-primary-500">{item.name}</NavLi>
				{/each}
			</NavUl>
		</NavContainer>
	</Navbar>
</div>
<style>
    @font-face {
        font-family: 'Mechanical Bold';
        src: url('/MechanicalBold-oOmA.woff2') format('woff2');
    }
	#nav-title {
		font-family: 'Mechanical Bold', serif;
	}

	#fixedNavWrapper :global(li .active::before) {
		content: '> ';
	}

</style>
