<script lang="ts">
	import { page } from '$app/state';
	import { sineIn } from 'svelte/easing';
	import { Navbar, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import BreadcrumbTrail from './BreadcrumbTrail.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let menuItems: { name: string; path: string }[] = [];

	// only get top level routes
	const rootPages = import.meta.glob('../routes/*/+page.svelte');
	menuItems.push({
		name: 'home',
		path: '/'
	});
	for (const path in rootPages) {
		const name = path.split('/').slice(-2)[0];
		if (name === 'violin') continue;
		let cleanPath = name === 'routes' ? '' : name;
		if (!cleanPath.startsWith('/')) {
			cleanPath = '/' + cleanPath;
		}
		if (!cleanPath.endsWith('/')) {
			cleanPath += '/';
		}
		menuItems.push({
			name: name,
			path: cleanPath
		});
	}
	menuItems.push({
		name: 'find me',
		path: 'https://me.zys.im/'
	});

	let slideParams = { delay: 50, duration: 150, easing: sineIn };

	// in this case the active url should only be the first part of the url (or  / if it's the home page)
	let activeUrl = $derived(
		page.url.pathname.length > 1 && page.url.pathname.split('/').length > 1
			? '/' + page.url.pathname.split('/')[1] + '/'
			: '/'
	);
</script>

<div id="fixedNavWrapper" class="relative z-30 h-11 w-full md:h-14">
	<!-- pseudo app top bar -->
	<div class="inset-s-0 top-0 z-20 h-9 w-full rounded-t-md bg-surface-2 md:h-5">
		<!-- centered site name and page title; one line, the path truncates on small
		     screens and leaves room on the right for the menu button -->
		<div
			class="container mx-auto flex h-full min-w-0 items-center justify-center overflow-hidden ps-2 pe-12 whitespace-nowrap md:px-0"
		>
			<span id="nav-prompt" class="hidden text-sm text-fg-muted sm:inline"
				>&nbsp;anon@zeyus&nbsp;</span
			>
			<BreadcrumbTrail />
			<span class="text-sm text-fg-muted" id="nav-title">$</span>
			<ThemeToggle />
		</div>
	</div>
	<Navbar
		fluid={false}
		navContainerClass="flex-nowrap relative content-center rounded h-0 md:h-4 flex-row items-center"
		class="relative inset-s-0 top-0 z-20 mt-0 h-0 w-full border-b-0 border-accent-faint bg-surface-3! px-2 py-0 pt-0 whitespace-nowrap shadow md:h-6 md:border-b-2 md:px-4"
	>
		<!-- <NavBrand href="/" class="self-center justify-self-start flex flex-row shrink w-5/6 md:w-1/2 lg:w-2/3 xl:w-3/4 xxl:w-4/5">
				<Img src="/images/zeyusdotcom@2x.png" srcset="/images/zeyusdotcom.png 1x, /images/zeyusdotcom@2x.png 2x, /images/zeyusdotcom@3x.png 3x" class="min-w-max max-w-max mr-3 h-6 sm:h-9" alt="zeyus dot com Logo" />
				<span id="nav-title" class="self-center max-w-max min-w-4 shrink whitespace-nowrap truncate text-left text-xl font-semibold"
					>{metaCtx.title(false)}</span
				>
			</NavBrand> -->
		<!-- sits in the top bar on small screens; 36px so it's actually tappable -->
		<NavHamburger
			class="absolute inset-e-1 -top-9 m-0 flex h-8 w-9 items-center justify-center rounded bg-primary-600 p-0 text-white md:hidden"
			classes={{ menu: 'h-5 w-5' }}
		/>
		<NavUl
			{activeUrl}
			{slideParams}
			class="absolute inset-e-0 top-0 z-100 w-auto justify-self-end text-right md:visible md:relative md:inset-e-0 md:top-0 md:flex md:h-4 md:max-w-max md:min-w-min md:grow md:flex-row"
			classes={{
				ul: 'bg-surface-2! border-line! pe-1 pt-3 pb-0 md:px-0 md:py-0 rounded-none md:pb-0 md:flex md:divide-none md:bg-transparent! md:items-stretch md:h-4 md:flex-row md:space-x-0 md:border-0 md:justify-self-end w-full md:flex-nowrap items-center'
			}}
		>
			{#each menuItems as item (item.path)}
				<NavLi
					href={item.path}
					class="nav-item m-0 my-auto h-8 w-full rounded-none bg-transparent ps-0 pt-0 align-bottom text-sm/[1] hover:bg-transparent! md:flex md:h-5.5 md:self-center md:border-none md:p-0 md:px-2 md:pt-1.5 md:align-middle md:hover:bg-primary-600! md:hover:text-white!"
					activeClass="active text-accent-strong! font-bold text-lg w-full"
					nonActiveClass="w-full">{item.name}</NavLi
				>
			{/each}
		</NavUl>
	</Navbar>
</div>

<style>
	#nav-title,
	#nav-prompt {
		font-family: 'Mechanical Bold', monospace;
	}

	#fixedNavWrapper :global(.nav-item) {
		font-family: 'Mechanical Bold', monospace;
	}

	#fixedNavWrapper :global(li .active::before) {
		content: '> ';
	}
</style>
