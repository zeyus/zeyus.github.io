<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { dev } from '$app/environment';
	import NavMenu from '$components/NavMenu.svelte';
	import BreadcrumbTrail from '$components/BreadcrumbTrail.svelte';

	import {
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterIcon,
		FooterLink
	} from 'flowbite-svelte';

	import {
		GithubSolid,
		YoutubeSolid,
		HeadphonesOutline,
		CodeOutline,
		UsersGroupOutline,
		VideoCameraOutline
	} from 'flowbite-svelte-icons';

	import { SvelteMap, SvelteSet } from 'svelte/reactivity';
	import { createMetadataContext, type MetadataContext } from '$lib/metadata.svelte';
	import { setContext, type Snippet } from 'svelte';
	import { createFootnotesContext, type FootnotesContext } from '$lib/footnotes.svelte';
	import ScrollToTop from '$components/ScrollToTop.svelte';
	import { imageToSrc } from '$lib/assets';

	// can this be less reactive or somehow work with pre-rendering?
	let items = new SvelteSet<Footnote>();
	let fnContext = createFootnotesContext(items);

	setContext<FootnotesContext>('footnotes', fnContext);

	let { children }: { children: Snippet } = $props();
	let year = new Date().getFullYear();
	let metadata = new SvelteMap<string, string>();
	let title = page.data.props?.title ?? 'zeyus dot com';
	let description =
		page.data.props?.excerpt ??
		'the official website of zeyus, a cognitive science researcher, developer, hacker, musician, and...';
	let ogImage = page.data.props?.feature_image?.src
		? imageToSrc(page.data.props.feature_image.src, page.url.pathname)
		: '/images/z_logo.jpg';
	let date = page.data.props?.date ?? new Date();

	let metaCtx = createMetadataContext(metadata, {
		defaultMeta: { title, description, ogImage, date },
		titleSuffix: '| zeyus dot com - cognitive science researcher, developer, hacker, musician, whatever'
	});

	setContext<MetadataContext>('metadata', metaCtx);

	let queryParams: string = $derived(
		new URLSearchParams({
			p: '44cc6df4-eff5-40cd-af14-c1987e06e46e',
			i: encodeURI(page.url.pathname),
			_: Date.now().toString()
		}).toString()
	);
</script>

<svelte:head>
	<title>{metaCtx.title()}</title>
	<link rel="schema.DC" href="http://purl.org/dc/elements/1.1/" />
	<link rel="schema.DCTERMS" href="http://purl.org/dc/terms/" />
	<meta name="description" content={metaCtx.description()} />
	<meta name="author" content="zeyus" />
	<meta property="og:image" content="https://zeyus.com{metaCtx.ogImage()}" />
	<meta property="og:title" content={metaCtx.title()} />
	<meta property="og:description" content={metaCtx.description()} />
	<meta property="og:site_name" content="zeyus dot com" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://zeyus.com{page.url.pathname}" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={metaCtx.title()} />
	<meta name="twitter:description" content={metaCtx.description()} />
	<meta name="twitter:image" content="https://zeyus.com{metaCtx.ogImage()}" />
	<meta name="DC.creator" content="zeyus, https://github.com/zeyus" />
	<meta name="DC.date" content={metaCtx.date()} />
	<meta name="DC.publisher" content="zeyus" />
	<meta name="DC.title" content={metaCtx.title()} />
	<meta name="DC.format" content="text/html" />
	<meta name="DC.type" content="Text" />
	<meta name="DC.identifier" content="https://zeyus.com{page.url.pathname}" />
	<meta name="DCTERMS.abstract" content={metaCtx.description()} />
</svelte:head>
<NavMenu />
<div class="main-content container mx-auto mt-2 mb-5 px-4 pb-16 sm:mt-2">
	<BreadcrumbTrail />
	{@render children()}
</div>
<ScrollToTop />
{#if !dev}
	<div class="absolute right-0 bottom-0">
		<img src="https://nozzle.localhose.com/pp/ship/?{queryParams}" alt="Pirates ^_^" />
	</div>
{/if}
<Footer
	class="sticky start-0 z-20 w-full border-t border-gray-700 bg-gray-900 p-2 shadow sm:flex-nowrap sm:px-4 sm:pt-0 dark:border-gray-700"
>
	<div class="container mx-auto">
		<div class="align-center flex flex-wrap items-center justify-center sm:justify-between">
			<FooterCopyright
				href="/"
				by="zeyus"
				{year}
				copyrightMessage="(source code available under MIT license)"
			/>

			<FooterLinkGroup class="my-3 flex flex-wrap items-center text-sm">
				<FooterLink href="https://github.com/zeyus/zeyus.github.io">
					<FooterIcon>
						<CodeOutline class="h-6 w-6" />
					</FooterIcon>
				</FooterLink>
				<FooterLink href="https://github.com/zeyus">
					<FooterIcon>
						<GithubSolid class="h-6 w-6" />
					</FooterIcon>
				</FooterLink>
				<FooterLink href="https://soundcloud.com/zeyus">
					<FooterIcon>
						<HeadphonesOutline class="h-6 w-6" />
					</FooterIcon>
				</FooterLink>
				<FooterLink href="https://www.youtube.com/@zeyusdotcom">
					<FooterIcon>
						<YoutubeSolid class="h-6 w-6" />
					</FooterIcon>
				</FooterLink>
				<FooterLink href="https://corteximplant.com/@zeyus">
					<FooterIcon>
						<UsersGroupOutline class="h-6 w-6" />
					</FooterIcon>
				</FooterLink>
				<FooterLink href="https://twitch.tv/zeyusdotcom">
					<FooterIcon>
						<VideoCameraOutline class="h-6 w-6" />
					</FooterIcon>
				</FooterLink>
			</FooterLinkGroup>
		</div>
	</div>
</Footer>
