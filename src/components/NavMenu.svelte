<script lang="ts">
	import { page } from '$app/stores';
	import { title } from '$lib/store.ts';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
  	import { Img } from 'flowbite-svelte';

	let menuItems: { name: string; path: string }[] = [];

	// only get top level routes
	const modules = import.meta.glob('../routes/*/+page.[sm][vd]*');
	for (const path in modules) {
		const name = path.split('/').slice(-2)[0];
		const cleanName = name === 'routes' ? 'home' : name;
		const cleanPath = '/' + (name === 'routes' ? '' : name);
		menuItems.push({
			name: cleanName,
			path: cleanPath
		});
	}
	// let navContainerClass = 'flex-nowrap';
	// menuItems.push({
	// 	name: 'vault',
	// 	path: '/vault'
	// });
	$: activeUrl = $page.url.pathname;
</script>

<Navbar let:hidden let:toggle let:NavContainer fluid={true} class="mb-4 whitespace-nowrap border-b shadow border-gray-700 dark:border-gray-700">
	<NavContainer class="flex-nowrap">
		<NavBrand href="/">
			<Img srcset="/images/zeyusdotcom.png 1x, /images/zeyusdotcom@2x.png 2x, /images/zeyusdotcom@3x.png 3x" class="mr-3 h-6 sm:h-9" alt="zeyus dot com Logo" />
			<div class="min-w-16 w-8/12">
				<div id="nav-title" class="truncate text-xl font-semibold dark:text-white"
					>{$title}</div
				>
			</div>
		</NavBrand>
		<NavHamburger size="lg" class="whitespace-nowrap" on:click={toggle} />
		<NavUl {hidden} {activeUrl}>
			{#each menuItems as item}
				<NavLi href={item.path} activeClass="active">{item.name}</NavLi>
			{/each}
		</NavUl>
	</NavContainer>
</Navbar>
<style>
    @font-face {
        font-family: 'Mechanical Bold';
        src: url('/MechanicalBold-oOmA.woff2') format('woff2');
    }
	#nav-title {
		font-family: 'Mechanical Bold', serif;
	}

</style>
