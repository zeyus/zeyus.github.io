<script lang="ts">
    import { page } from '$app/state';
    import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
    // can this be non-reactive?
    let crumbs: Array<{ label: string, href: string }> = $state([]);
    //let crumbs: Array<{ label: string, href: string }> = [];
    // $effect(() => {
    // Remove zero-length tokens.
    let tokens = page.url.pathname.split('/').filter((t) => t !== '');
    // Create { label, href } pairs for each token.
    let tokenPath = '/';
    crumbs = tokens.map((t) => {
        tokenPath += t + '/';
        return { label: t, href: tokenPath };
    });
    //});
    // unnecessary duplication to allow reactivity during dev but static during prod
    $effect(() => {
        tokens = page.url.pathname.split('/').filter((t) => t !== '');
        tokenPath = '/';
        crumbs = tokens.map((t) => {
            tokenPath += t + '/';
            return { label: t, href: tokenPath };
        });
    });

</script>
<Breadcrumb class="mb-4">
    <BreadcrumbItem href="/" home>home</BreadcrumbItem>
    {#each crumbs as item}
        <BreadcrumbItem href={item.href}>{item.label}</BreadcrumbItem>
    {/each}
</Breadcrumb>
