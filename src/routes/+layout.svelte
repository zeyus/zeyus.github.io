<script lang="ts">
    import "../app.postcss";
    import { page } from '$app/state';
    import { dev } from '$app/environment';
    import NavMenu from "$components/NavMenu.svelte";
    import BreadcrumbTrail from "$components/BreadcrumbTrail.svelte";
    import { Footer, FooterCopyright, FooterLinkGroup, FooterIcon, FooterLink } from "flowbite-svelte";
    import { GithubSolid, YoutubeSolid, HeadphonesOutline, CodeOutline, UsersGroupOutline, VideoCameraOutline } from 'flowbite-svelte-icons';
    import { SvelteMap, SvelteSet } from 'svelte/reactivity';
    import { createMetadataContext, type MetadataContext } from "$lib/metadata.svelte";
	import { setContext } from "svelte";
    import Bibliography from "$components/Bibliography.svelte";
    import { createFootnotesContext, type FootnotesContext } from "$lib/footnotes.svelte";
    import ScrollToTop from "$components/ScrollToTop.svelte";
	import { imageToSrc } from "$lib/assets";

    // can this be less reactive or somehow work with pre-rendering?
    let items = new SvelteSet<Footnote>();
    let fnContext = createFootnotesContext(items);
    setContext<FootnotesContext>('footnotes', fnContext);

    let year = new Date().getFullYear();

    let metadata = new SvelteMap<string, string>();
    let title = page.data.props?.title ?? 'zeyus dot com';
    let description = page.data.props?.excerpt ?? 'the official website of zeyus, a cognitive science researcher, software engineer, hacker, musician, and...';
    let ogImage = page.data.props?.feature_image?.src ? imageToSrc(page.data.props.feature_image.src, page.url.pathname) : '/images/zeyusdotcom@3x.png';
    let date = page.data.props?.date ?? new Date();
    let metaCtx = createMetadataContext(metadata, {
        defaultMeta: {
            title: title,
            description: description,
            ogImage: ogImage,
            date: date,
        },
        titleSuffix: '| zeyus dot com',
    });
    setContext<MetadataContext>('metadata', metaCtx);
    
</script>
<svelte:head>
	<title>{metaCtx.title()}</title>
    <link rel="schema.DC" href="http://purl.org/dc/elements/1.1/" />
    <link rel="schema.DCTERMS" href="http://purl.org/dc/terms/" />
    <meta name="description" content="{metaCtx.description()}" />
    <meta name="author" content="zeyus" />
    <meta property="og:image" content="https://zeyus.com{metaCtx.ogImage()}" />
    <meta property="og:title" content="{metaCtx.title()}" />
    <meta property="og:description" content="{metaCtx.description()}" />
    <meta property="og:site_name" content="zeyus dot com" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://zeyus.com{page.url.pathname}" />
    <meta name="DC.creator" content="zeyus, https://github.com/zeyus" />
    <meta name="DC.date" content="{metaCtx.date()}" />
    <meta name="DC.publisher" content="zeyus" />
    <meta name="DC.title" content="{metaCtx.title()}" />
    <meta name="DC.format" content="text/html" />
    <meta name="DC.type" content="Text" />
    <meta name="DC.identifier" content="https://zeyus.com{page.url.pathname}" />
    <meta name="DCTERMS.abstract" content="{metaCtx.description()}" />

</svelte:head>
<NavMenu />
<div class="container mx-auto mt-2 sm:mt-2 px-4 mb-5 pb-16">
    <BreadcrumbTrail />
    <slot />
</div>
<ScrollToTop />
<Footer class="bg-gray-900 p-2 sticky start-0 z-20 w-full border-t shadow border-gray-700 dark:border-gray-700 sm:px-4 sm:flex-nowrap sm:pt-0">
    <div class="container mx-auto">
        <div class="align-center justify-center flex flex-wrap items-center sm:justify-between">
            <FooterCopyright href="/" by="zeyus" year={year} copyrightMessage="(source code available under MIT license)" />

            <FooterLinkGroup ulClass="flex flex-wrap items-center my-3 text-sm">
                <FooterLink href="https://github.com/zeyus/zeyus.github.io">
                    <FooterIcon>
                        <CodeOutline class="w-6 h-6" />
                    </FooterIcon>
                </FooterLink>
                <FooterLink href="https://github.com/zeyus">
                    <FooterIcon>
                        <GithubSolid class="w-6 h-6" />
                    </FooterIcon>
                </FooterLink>
                <FooterLink href="https://soundcloud.com/zeyus">
                    <FooterIcon>
                        <HeadphonesOutline class="w-6 h-6" />
                    </FooterIcon>
                </FooterLink>
                <FooterLink href="https://www.youtube.com/@zeyusdotcom">
                    <FooterIcon>
                        <YoutubeSolid class="w-6 h-6" />
                    </FooterIcon>
                </FooterLink>
                <FooterLink href="https://corteximplant.com/@zeyus">
                    <FooterIcon>
                        <UsersGroupOutline class="w-6 h-6" />
                    </FooterIcon>
                </FooterLink>
                <FooterLink href="https://twitch.tv/zeyusdotcom">
                    <FooterIcon>
                        <VideoCameraOutline class="w-6 h-6" />
                    </FooterIcon>
                </FooterLink>
            </FooterLinkGroup> 
        </div>
    </div>
    {#if !dev}
        <img src="https://nozzle.localhose.com/pp/ship/?p=44cc6df4-eff5-40cd-af14-c1987e06e46e&i={encodeURI(page.url.pathname)}" alt="Pirates ^_^" />
    {/if}
</Footer>
