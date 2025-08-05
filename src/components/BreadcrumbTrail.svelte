<script lang="ts">
    import { page } from '$app/state';
    import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import { ChevronDoubleRightOutline, HomeOutline } from 'flowbite-svelte-icons';
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
<Breadcrumb id="breadcrumb-trail" classes={{list: "flex"}} class="mb-2" aria-label="Breadcrumb">
    <BreadcrumbItem href="/" home={true}>{#snippet icon()}
      <HomeOutline class="me-2 h-4 w-4" />
    {/snippet}home</BreadcrumbItem>
    {#each crumbs as item}
        <BreadcrumbItem href={item.href}>{#snippet icon()}
      <ChevronDoubleRightOutline class="mx-2 h-5 w-5 dark:text-white" />
    {/snippet}{item.label}</BreadcrumbItem>
    {/each}
</Breadcrumb>
<style>
    :global(#breadcrumb-trail li svg) {
        display: inline-flex;
    }
</style>
