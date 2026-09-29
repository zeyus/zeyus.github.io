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
	classes={{ list: 'flex flex-nowrap min-w-0 text-fg-muted' }}
	class="mt-2 mb-2 min-w-0"
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
	/* long paths stay on one line: the last segment gets cut off with an ellipsis */
	:global(#breadcrumb-trail li) {
		flex-shrink: 0;
		white-space: nowrap;
	}
	:global(#breadcrumb-trail li:last-child) {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		flex-shrink: 1;
		min-width: 0;
	}
	:global(#breadcrumb-trail li:last-child a) {
		display: block;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
