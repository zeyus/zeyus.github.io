<script lang="ts">
    import { page } from '$app/state';
    import { nth, sortPosts } from '$lib/utils.ts';
    import { onMount } from 'svelte';
    import { BREAKPOINTS, uiHelpers, CloseButton, Sidebar, SidebarBrand, SidebarGroup, SidebarItem, SidebarWrapper, SidebarButton, Button } from 'flowbite-svelte';
	import { ChevronRightOutline } from 'flowbite-svelte-icons';
	import { draw } from 'svelte/transition';

    let { sidebarItems }: { sidebarItems: App.VaultEntries[] } = $props();

    // sort sidebar items by year,month, day descending
    sidebarItems.sort(sortPosts);
    const sidebarUi = uiHelpers();
    const closeSidebar = sidebarUi.close;
    const openSidebar = sidebarUi.open;
    let breakPoint: number = BREAKPOINTS['2xl'];
	let width: number = $state(0);
	let activateClickOutside = $state(true);
    let drawerVisible = $state(false);
    $effect(() => {
        if (width >= breakPoint) {
            openSidebar();
            drawerVisible = true;
            activateClickOutside = false;
        } else {
            closeSidebar();
            drawerVisible = false;
            activateClickOutside = true;
        }
        
    });


    onMount(() => {
		if (width >= breakPoint) {
            openSidebar();
            drawerVisible = true;
			activateClickOutside = false;
		} else {
            closeSidebar();
            drawerVisible = false;
			activateClickOutside = true;
		}

	});

    const site = {
        name: 'Recent posts',
        href: '/_vault/',
        img: '/favicon.png'
    }

    const activeClass = 'flex items-center';
    const nonActiveClass = 'flex items-center p-2';
    
    
    let sidebarItemsGrouped = (() => {
        let currentYear: number = 0;
        let currentMonth: number = 0;
        const items: Record<string, App.VaultEntries[]> = {};
        for (const item of sidebarItems) {
            const date = item.props.date;
            if (currentYear !== date.getFullYear() || currentMonth !== date.getMonth()) {
                currentYear = date.getFullYear();
                currentMonth = date.getMonth();
                items[item.props.date.toLocaleString('default', { month: 'short' }) + " '" + item.props.date.toLocaleString('default', { year: '2-digit' })] = [];
            }
            items[item.props.date.toLocaleString('default', { month: 'short' }) + " '" + item.props.date.toLocaleString('default', { year: '2-digit' })].push(item);
        }
        return items;
    })();

</script>
<svelte:window bind:innerWidth={width} />
<Button hidden={drawerVisible} onclick={openSidebar} class="cursor-pointer focus:ring-transparent focus:ring-0 fixed start-0 top-1/2 whitespace-normal p-0 hover:bg-gray-100 dark:hover:bg-gray-600 my-0 rounded-none mx-0">
    <ChevronRightOutline class="w-6 h-8" />
</Button>
<Sidebar id="postSidebar" isOpen={sidebarUi.isOpen} activateClickOutside={activateClickOutside}
    closeSidebar={closeSidebar}
    classes={{ active: activeClass, nonactive: nonActiveClass, div: "p-0 m-0 rounded-lg" }}
    activeUrl={page.url.pathname} breakpoint="2xl" position="fixed" backdrop={false}
    class="w-64 top-1/6 h-2/3 p-0 m-0 rounded-lg 2xl:top-30">
    <CloseButton onclick={closeSidebar} class="rounded-full cursor-pointer shadow-sm/80 bg-red-900 2xl:hidden right-2 top-2 active:shadow-none hover:text-white absolute focus:ring-transparent focus:ring-0 focus:outline-none" />
    
    <SidebarWrapper class="overflow-y-auto w-64 px-3 py-4 m-0 bg-none border-none">
        <SidebarBrand {site} classes={{span: "ms-3 font-bold text-xl inline-block"}}>zeyus dot com</SidebarBrand>
        <SidebarGroup>
            {#each Object.entries(sidebarItemsGrouped) as [key, sidebarItems]}
                <SidebarItem spanClass="text-slate-400 font-bold border-b-2 border-slate-700 w-full text-right mt-4 mb-2" activeClass="flex flex-row-reverse" nonActiveClass="flex flex-row-reverse" label={key} />
                {#each sidebarItems as item}
                    <SidebarItem spanClass="basis-11/12 self-center" activeClass="bg-gradient-to-r from-gray-800 via-75% via-black/[.15] to-gray-800 current-post flex text-sm flex-row font-bold text-primary-500 ps-0" nonActiveClass="flex font-bold text-sm flex-row ps-0" href={item.path} label={item.props.short_title || item.props.title}>
                        {#snippet subtext()}
                            <span class="font-bold text-right basis-1/12 pe-0 self-center justify-self-end min-h-6 text-xs text-slate-400">{item.props.date.toLocaleString(
                                'default',
                                {
                                    day: 'numeric'
                                }
                            )}<sup>{nth(item.props.date.getDate())}</sup></span>
                        {/snippet}
                    </SidebarItem>
                {/each}
            {/each}
        </SidebarGroup>
    </SidebarWrapper>
</Sidebar>
<style>
    :global(#postSidebar .current-post::before) {
        content: '> ';
        align-self: center;
    }
</style>
