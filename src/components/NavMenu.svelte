<script lang="ts">
	import { page } from '$app/stores';
	import { title } from '$lib/store.ts';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { DarkMode } from 'flowbite-svelte';
  import { Img } from 'flowbite-svelte';
	let darkmodebtn =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg z-50';

	let menuItems: { name: string; path: string }[] = [];
	let currentPage: string = $page.url.pathname;

	const modules = import.meta.glob('../routes/**/+page.svelte');
	for (const path in modules) {
		const name = path.split('/').slice(-2)[0];
		const cleanName = name === 'routes' ? 'home' : name;
		const cleanPath = '/' + (name === 'routes' ? '' : name);
		menuItems.push({
			name: cleanName,
			path: cleanPath
		});
	}
	menuItems.push({
		name: 'vault',
		path: '/vault'
	});
</script>

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<Img srcset="/images/zeyusdotcom.png 1x, /images/zeyusdotcom@2x.png 2x, /images/zeyusdotcom@3x.png 3x" class="mr-3 h-6 sm:h-9" alt="zeyus dot com Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>{$title}</span
		>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		{#each menuItems as item}
			<NavLi href={item.path} active={currentPage === item.path}>{item.name}</NavLi>
		{/each}
    <NavLi><DarkMode btnClass={darkmodebtn} /></NavLi>
	</NavUl>
  
</Navbar>
