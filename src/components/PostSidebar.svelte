<script lang="ts">
	import { page } from '$app/state';
	import { nth, sortPosts } from '$lib/utils.ts';
	import { onMount } from 'svelte';
	import {
		BREAKPOINTS,
		uiHelpers,
		CloseButton,
		Sidebar,
		SidebarBrand,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		SidebarButton,
		Button
	} from 'flowbite-svelte';
	import { ChevronRightOutline } from 'flowbite-svelte-icons';
	import { draw } from 'svelte/transition';

	let { sidebarItems }: { sidebarItems: App.VaultEntries[] } = $props();

	// sort sidebar items by year,month, day descending
	(() => sidebarItems)().sort(sortPosts);
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

	const activeClass = 'flex items-center';
	const nonActiveClass = 'flex items-center p-2';

	let sidebarItemsGrouped = (() => {
		let currentYear: number = 0;
		let currentMonth: number = 0;
		const items: Record<string, App.VaultEntries[]> = {};
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
	class="fixed inset-s-0 top-1/2 mx-0 my-0 cursor-pointer rounded-none p-0 whitespace-normal hover:bg-gray-100 focus:ring-0 focus:ring-transparent dark:hover:bg-gray-600"
>
	<ChevronRightOutline class="h-8 w-6" />
</Button>
<Sidebar
	id="postSidebar"
	isOpen={sidebarUi.isOpen}
	{activateClickOutside}
	{closeSidebar}
	classes={{
		active: activeClass,
		nonactive: nonActiveClass,
		div: 'p-0 m-0 rounded-lg dark:bg-zinc-900'
	}}
	activeUrl={page.url.pathname}
	breakpoint="2xl"
	position="fixed"
	backdrop={false}
	class="top-1/3 m-0 max-h-1/2 w-66 rounded-lg border-2 p-0 2xl:top-56 dark:border-primary-900 dark:bg-zinc-900"
>
	<CloseButton
		onclick={closeSidebar}
		class="absolute top-2 right-2 cursor-pointer rounded-none bg-red-700 hover:text-white focus:ring-0 focus:ring-transparent focus:outline-none active:shadow-none 2xl:hidden dark:text-white"
	/>

	<SidebarWrapper class="m-0 w-64 overflow-y-auto border-none bg-none px-3 py-4">
		<SidebarBrand {site} classes={{ span: 'ms-3 font-bold text-xl inline-block' }}
			>zeyus dot com</SidebarBrand
		>
		<SidebarGroup class="dark:bg-none">
			{#each Object.entries(sidebarItemsGrouped) as [key, sidebarItems]}
				<SidebarItem
					spanClass="text-slate-400 font-bold border-b-2 border-slate-700 w-full text-right mt-4 mb-2"
					activeClass="flex flex-row-reverse"
					nonActiveClass="flex flex-row-reverse"
					label={key}
				/>
				{#each sidebarItems as item}
					<SidebarItem
						spanClass="basis-11/12 self-center"
						activeClass="bg-gradient-to-r from-zinc-900 via-75% via-zinc-400/[.15] to-zinc-900 current-post flex text-sm flex-row font-bold text-primary-500 ps-0"
						nonActiveClass="flex font-bold text-sm flex-row ps-0"
						href={item.path}
						label={item.props.short_title || item.props.title}
					>
						{#snippet subtext()}
							<span
								class="min-h-6 basis-1/12 self-center justify-self-end pe-0 text-right text-xs font-bold text-slate-400"
								>{item.props.date.toLocaleString('default', {
									day: 'numeric'
								})}<sup>{nth(item.props.date.getDate())}</sup></span
							>
						{/snippet}
					</SidebarItem>
				{/each}
			{/each}
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>

<style>
	:global(#postSidebar .current-post::before) {
		content: '> ';
		align-self: center;
	}
</style>
