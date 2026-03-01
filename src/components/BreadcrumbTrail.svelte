<script lang="ts">
	import { page } from '$app/state';
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import { HomeOutline } from 'flowbite-svelte-icons';
	// can this be non-reactive?
	let crumbs: Array<{ label: string; href: string }> = $state([]);
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

<Breadcrumb
	id="breadcrumb-trail"
	classes={{ list: 'flex text-gray-700 dark:text-gray-400' }}
	class="mt-2 mb-2"
	aria-label="Breadcrumb"
>
	<BreadcrumbItem href="/" home={true}
		>{#snippet icon()}
			<HomeOutline class="mr-1 h-3 w-3" />
		{/snippet}~</BreadcrumbItem
	>
	{#each crumbs as item}
		<BreadcrumbItem href={item.href}
			>{#snippet icon()}
				/
			{/snippet}{item.label}</BreadcrumbItem
		>
	{/each}
</Breadcrumb>

<style>
	:global(#breadcrumb-trail li svg) {
		display: inline-flex;
	}
	:global(#breadcrumb-trail) {
		font-family: 'Mechanical Bold', monospace;
	}
</style>
