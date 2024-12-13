<script lang="ts">
    import { page } from '$app/stores';
    import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';

    let breadcrumbs: { name: string; path: string }[] = [];
    const path = $page.url.pathname.split('/').filter(Boolean);
    let currentPath = '';
    path.forEach((item, index) => {
        currentPath += '/' + item;
        breadcrumbs.push({
            name: item,
            path: currentPath
        });
    });
    let crumbs: Array<{ label: string, href: string }> = [];
    $: {
        // Remove zero-length tokens.
        const tokens = $page.url.pathname.split('/').filter((t) => t !== '');

        // Create { label, href } pairs for each token.
        let tokenPath = '';
        crumbs = tokens.map((t) => {
        tokenPath += '/' + t;
        return { label: t, href: tokenPath };
        });
    }

</script>
<Breadcrumb class="mb-4">
    <BreadcrumbItem href="/" home>home</BreadcrumbItem>
    {#each crumbs as item}
        <BreadcrumbItem href={item.href}>{item.label}</BreadcrumbItem>
    {/each}
</Breadcrumb>
