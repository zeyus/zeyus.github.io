<script lang="ts">
    import { page } from '$app/state';
    import { nth, sortPosts } from '$lib/utils.ts';
    import { Sidebar, SidebarBrand, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
    const posts = import.meta.glob('../routes/_vault/*/**/+page.svelte');

    let { sidebarItems }: { sidebarItems: App.VaultEntries[] } = $props();

    // sort sidebar items by year,month, day descending
    sidebarItems.sort(sortPosts);

    const site = {
        name: 'Recent posts',
        href: '/_vault/',
        img: '/favicon.png'
    }

    const activeClass = 'flex items-center p-2 text-base font-normal text-primary-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700';
    const nonActiveClass = 'flex items-center p-2 text-base font-normal text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-gray-700';
    let currentYear: number = $state(0);
    let currentMonth: number = $state(0);
    let setYear = (year: number) => {
        currentYear = year;
    }
    let setMonth = (month: number) => {
        currentMonth = month;
    }

</script>
<div id="postSidebar">
    <Sidebar activeUrl={page.url.pathname} {activeClass} {nonActiveClass} asideClass="w-64">
        <SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
            <SidebarBrand {site} spanClass="font-bold text-xl">zeyus dot com</SidebarBrand>
            <SidebarGroup>
                {#each sidebarItems as item}
                    {#if currentYear !== item.props.date.getFullYear() || currentMonth !== item.props.date.getMonth()}
                        <SidebarItem spanClass="text-slate-400 font-bold" activeClass="flex flex-row-reverse" nonActiveClass="flex flex-row-reverse" href={item.path} label={item.props.date.toLocaleString('default', { month: 'short' }) + " '" + item.props.date.toLocaleString('default', { year: '2-digit' })} />
                        {setYear(item.props.date.getFullYear())}
                        {setMonth(currentMonth = item.props.date.getMonth())}
                    {/if}
                    <SidebarItem spanClass="basis-4/5" activeClass="current-post flex flex-row text-primary-500 ps-3" nonActiveClass="flex flex-row ps-3" href={item.path} label={item.props.short_title || item.props.title}>
                        <span class="self-center font-bold text-right basis-1/5 pe-3 justify-self-end text-xs text-slate-400" slot="subtext">{item.props.date.toLocaleString(
                            'default',
                            {
                                day: 'numeric'
                            }
                        )}<sup>{nth(item.props.date.getDate())}</sup></span>
                    </SidebarItem>
                {/each}
            </SidebarGroup>
        </SidebarWrapper>
    </Sidebar>
</div>
<style>
    #postSidebar :global(.current-post::before) {
        content: '> ';
    }
</style>
