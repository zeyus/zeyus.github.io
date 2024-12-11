<script lang="ts">
    import { page } from '$app/stores';
    import { Sidebar, SidebarBrand, SidebarCta, SidebarDropdownItem, SidebarDropdownWrapper, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
    const posts = import.meta.glob('../routes/vault/*/**/+page.md');

    let sidebarItems: { name: string; path: string }[] = [];
    
    for (const path in posts) {
        
        const name = path.split('/').slice(-2)[0];
        console.log(name);
        const cleanPath = '/vault/' + name;
        sidebarItems.push({
            name: name,
            path: cleanPath
		});
    }

    const site = {
        name: 'vault: posts',
        href: '/vault',
        img: '/favicon.png'
    }

    $: activeUrl = $page.url.pathname;
    const activeClass = 'flex items-center p-2 text-base font-normal text-primary-900 bg-primary-200 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-gray-700';
    const nonActiveClass = 'flex items-center p-2 text-base font-normal text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-gray-700';
</script>
<Sidebar {activeUrl} {activeClass} {nonActiveClass} asideClass="w-54">
    <SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
        <SidebarGroup>
            <SidebarBrand {site}>zeyus dot com</SidebarBrand>
            {#each sidebarItems as item}
                <SidebarItem href={item.path} label={item.name}></SidebarItem>
            {/each}
        </SidebarGroup>
    </SidebarWrapper>
</Sidebar>
