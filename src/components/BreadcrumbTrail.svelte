<script lang="ts">
	import { page } from '$app/state';
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import { HomeOutline } from 'flowbite-svelte-icons';
	let crumbs = $derived.by(() => {
		let href = '/';
		return page.url.pathname
			.split('/')
			.filter((t) => t !== '')
			.map((label) => {
				href += label + '/';
				return { label, href };
			});
	});
</script>

<Breadcrumb
	id="breadcrumb-trail"
	classes={{ list: 'flex text-fg-muted' }}
	class="mt-2 mb-2"
	aria-label="Breadcrumb"
>
	<BreadcrumbItem href="/" home={true}
		>{#snippet icon()}
			<HomeOutline class="mr-1 h-3 w-3" />
		{/snippet}~</BreadcrumbItem
	>
	{#each crumbs as item (item.href)}
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
