<script>
    import "../app.postcss";
    // @ts-ignore
    import { title } from "$lib/store.ts";
    import NavMenu from "../components/NavMenu.svelte";
    import BreadcrumbTrail from "../components/BreadcrumbTrail.svelte";
    import { Footer, FooterCopyright, FooterLinkGroup, FooterIcon } from "flowbite-svelte";
    import { GithubSolid, YoutubeSolid, HeadphonesOutline, CodeOutline, UsersGroupOutline, VideoCameraOutline } from 'flowbite-svelte-icons';
    // get current year
    let year = new Date().getFullYear();
</script>
<svelte:head>
	<title>{$title} - zeyus dot com</title>
</svelte:head>
<NavMenu />
<div class="container mx-auto mt-14 sm:mt-20 px-4 mb-5 pb-16">
    <BreadcrumbTrail />
    <slot />
</div>
<Footer class="bg-gray-900 p-2 sticky start-0 z-20 w-full border-t shadow border-gray-700 dark:border-gray-700 sm:px-4 sm:flex-nowrap sm:pt-0">
    <div class="container mx-auto">
        <div class="align-center justify-center flex flex-wrap items-center sm:justify-between">
            <FooterCopyright href="/" by="zeyus" year={year} copyrightMessage="(source code available under MIT license)" />

            <FooterLinkGroup ulClass="flex flex-wrap items-center my-3 text-sm">
                <FooterIcon href="https://github.com/zeyus/zeyus.github.io">
                    <CodeOutline class="w-6 h-6" />
                </FooterIcon>
                <FooterIcon href="https://github.com/zeyus">
                    <GithubSolid class="ml-3 w-6 h-6" />
                </FooterIcon>
                <FooterIcon href="https://soundcloud.com/zeyus">
                    <HeadphonesOutline class="ml-3 w-6 h-6" />
                </FooterIcon>
                <FooterIcon href="https://www.youtube.com/@zeyusdotcom">
                    <YoutubeSolid class="ml-3 w-6 h-6" />
                </FooterIcon>
                <FooterIcon href="https://corteximplant.com/@zeyus">
                    <UsersGroupOutline class="ml-3 w-6 h-6" />
                </FooterIcon>
                <FooterIcon href="https://twitch.tv/zeyusdotcom">
                    <VideoCameraOutline class="ml-3 w-6 h-6" />
                </FooterIcon>
            </FooterLinkGroup> 
        </div>
    </div>
</Footer>
