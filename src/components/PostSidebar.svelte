<script lang="ts">
	import { page } from '$app/state';
	import { sortPosts } from '$lib/utils.ts';
	import { onMount } from 'svelte';
	import { BREAKPOINTS, uiHelpers, CloseButton, Sidebar, Button } from 'flowbite-svelte';
	import { ChevronRightOutline } from 'flowbite-svelte-icons';

	let { sidebarItems }: { sidebarItems: App.VaultEntries[] } = $props();

	const sidebarUi = uiHelpers();
	const closeSidebar = sidebarUi.close;
	const openSidebar = sidebarUi.open;
	const toggleSidebar = sidebarUi.toggle;
	let breakPoint: number = BREAKPOINTS['2xl'];
	let width: number = $state(0);
	let activateClickOutside = $state(true);
	let drawerVisible = $state(false);
	$effect(() => {
		if (width >= breakPoint) {
			openSidebar();
			drawerVisible = true;
			activateClickOutside = false;
		} else {
			closeSidebar();
			drawerVisible = false;
			activateClickOutside = true;
		}
	});

	onMount(() => {
		if (width >= breakPoint) {
			openSidebar();
			drawerVisible = true;
			activateClickOutside = false;
		} else {
			closeSidebar();
			drawerVisible = false;
			activateClickOutside = true;
		}
	});

	const site = {
		name: 'Recent posts',
		href: '/_vault/',
		img: '/favicon.png'
	};

	let sidebarItemsGrouped = (() => {
		let currentYear: number = 0;
		let currentMonth: number = 0;
		const items: Record<string, App.VaultEntries[]> = {};
		sidebarItems.sort(sortPosts);
		for (const item of sidebarItems) {
			const date = item.props.date;
			if (currentYear !== date.getFullYear() || currentMonth !== date.getMonth()) {
				currentYear = date.getFullYear();
				currentMonth = date.getMonth();
				items[
					item.props.date.toLocaleString('default', { month: 'short' }) +
						" '" +
						item.props.date.toLocaleString('default', { year: '2-digit' })
				] = [];
			}
			items[
				item.props.date.toLocaleString('default', { month: 'short' }) +
					" '" +
					item.props.date.toLocaleString('default', { year: '2-digit' })
			].push(item);
		}
		return items;
	})();
</script>

<svelte:window bind:innerWidth={width} />
<Button
	hidden={drawerVisible}
	onclick={toggleSidebar}
	class="fixed inset-s-0 top-1/2 mx-0 my-0 cursor-pointer rounded-none p-0 whitespace-normal hover:bg-surface-3 focus:ring-0 focus:ring-transparent"
>
	<ChevronRightOutline class="h-8 w-6" />
</Button>
<Sidebar
	id="postSidebar"
	isOpen={sidebarUi.isOpen}
	{activateClickOutside}
	{closeSidebar}
	classes={{ div: 'p-0 m-0 rounded-lg bg-surface!' }}
	activeUrl={page.url.pathname}
	breakpoint="2xl"
	position="fixed"
	backdrop={false}
	class="top-1/3 m-0 max-h-1/2 w-66 overflow-y-auto rounded-lg border border-line bg-surface! p-0 shadow-lg 2xl:sticky 2xl:top-6 2xl:z-auto 2xl:mt-2 2xl:max-h-[calc(100vh-3rem)] 2xl:shrink-0 2xl:self-start 2xl:shadow-none"
>
	<CloseButton
		onclick={closeSidebar}
		class="absolute top-2 right-2 cursor-pointer rounded-none bg-red-700 text-white! hover:text-white focus:ring-0 focus:ring-transparent focus:outline-none active:shadow-none 2xl:hidden"
	/>

	<nav class="vault-ls" aria-label="Recent posts">
		<a href={site.href} class="vault-ls-prompt"
			><span class="text-accent">~/_vault</span> $ ls -t<span class="vault-ls-cursor">▌</span></a
		>
		{#each Object.entries(sidebarItemsGrouped) as [month, posts] (month)}
			<div class="vault-ls-month">{month.toLowerCase()}</div>
			<ul>
				{#each posts as item (item.path)}
					{@const current = page.url.pathname.replace(/\/$/, '') === item.path.replace(/\/$/, '')}
					<li>
						<a href={item.path} class:current aria-current={current ? 'page' : undefined}>
							<span class="vault-ls-day"
								>{item.props.date.toLocaleString('default', { day: '2-digit' })}</span
							>
							<span class="vault-ls-title">{item.props.short_title || item.props.title}</span>
						</a>
					</li>
				{/each}
			</ul>
		{/each}
	</nav>
</Sidebar>

<style>
	.vault-ls {
		padding: 1rem 0.75rem 1.25rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		line-height: 1.4;
	}

	.vault-ls-prompt {
		display: block;
		margin-bottom: 0.75rem;
		padding-inline: 0.5rem;
		color: var(--color-fg-muted);
	}

	.vault-ls-cursor {
		margin-left: 0.2em;
		color: var(--color-accent);
		animation: cursor-blink 1.1s steps(1) infinite;
	}

	@media (prefers-reduced-motion: reduce) {
		.vault-ls-cursor {
			animation: none;
		}
	}

	.vault-ls-month {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 1rem 0.5rem 0.35rem;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: var(--color-fg-subtle);

		&::before {
			content: '#';
			color: var(--color-accent);
		}

		&::after {
			content: '';
			flex: 1;
			border-top: 1px dashed var(--color-line);
		}
	}

	.vault-ls a:not(.vault-ls-prompt) {
		display: flex;
		gap: 0.6rem;
		padding: 0.3rem 0.5rem;
		border-left: 2px solid transparent;
		color: var(--color-fg);
		transition:
			background-color 0.15s,
			border-color 0.15s;

		&:hover {
			background-color: var(--color-surface-2);
			border-left-color: var(--color-accent-soft);
		}

		&.current {
			background-color: var(--color-surface-2);
			border-left-color: var(--color-accent);
			color: var(--color-accent-strong);
			text-shadow: 0 0 8px var(--color-glow);
		}
	}

	.vault-ls-day {
		flex: none;
		color: var(--color-fg-subtle);
	}

	.current .vault-ls-day {
		color: var(--color-accent);
	}
</style>
