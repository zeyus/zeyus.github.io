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
    
    
    let sidebarItemsGrouped = $derived(() => {
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
    });

                


</script>
<div id="postSidebar">
    <Sidebar activeUrl={page.url.pathname} classes= {{ active: activeClass, nonactive: nonActiveClass, div: "w-64"}}>
        <SidebarWrapper class="overflow-y-auto py-4 px-3 rounded bg-none border-primary-800 border-2 pb-8">
            <SidebarBrand {site} classes={{span: "font-bold text-xl"}}>zeyus dot com</SidebarBrand>
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
</div>
<style>
    #postSidebar :global(.current-post::before) {
        content: '> ';
        align-self: center;
    }
</style>
