<script lang="ts">
    import { page } from '$app/state';
    import { nth, sortPosts } from '$lib/utils.ts';
    import { Sidebar, SidebarBrand, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';

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
        <SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded bg-none border-primary-800 border-2 pb-8">
            <SidebarBrand {site} spanClass="font-bold text-xl">zeyus dot com</SidebarBrand>
            <SidebarGroup>
                {#each sidebarItems as item}
                    {#if currentYear !== item.props.date.getFullYear() || currentMonth !== item.props.date.getMonth()}
                        <SidebarItem spanClass="text-slate-400 font-bold border-b-2 border-slate-700 w-full text-right mt-4 mb-2" activeClass="flex flex-row-reverse" nonActiveClass="flex flex-row-reverse" href={item.path} label={item.props.date.toLocaleString('default', { month: 'short' }) + " '" + item.props.date.toLocaleString('default', { year: '2-digit' })} />
                        {setYear(item.props.date.getFullYear())}
                        {setMonth(currentMonth = item.props.date.getMonth())}
                    {/if}
                    <SidebarItem spanClass="basis-11/12 self-center" activeClass="bg-gradient-to-r from-gray-800 via-75% via-black/[.15] to-gray-800 current-post flex text-sm flex-row font-bold text-primary-500 ps-0" nonActiveClass="flex font-bold text-sm flex-row ps-0" href={item.path} label={item.props.short_title || item.props.title}>
                        <span class="font-bold text-right basis-1/12 pe-0 self-center justify-self-end min-h-6 text-xs text-slate-400" slot="subtext">{item.props.date.toLocaleString(
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
        align-self: center;
    }
</style>
