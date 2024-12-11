<script context="module">
    import p from "../components/typo/p.svelte";
    import h1 from "../components/typo/h1.svelte";
    export { p, h1 };
</script>
<script lang="ts">
    import { Heading, P, Drawer, CloseButton, Button } from "flowbite-svelte";
    import { BarsOutline } from "flowbite-svelte-icons";
    import { title as t } from "$lib/store.ts";
    import { onMount } from 'svelte';
    import PostSidebar from "../components/PostSidebar.svelte";
    export let title: string;
    export let date: string;
    t.set("vault: " + title);

    // make date human readable
    let d: Date = new Date(date);
    let options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    date = d.toLocaleDateString(undefined, options);

    import { sineIn } from 'svelte/easing';

	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
    let breakPoint: number = 1024;
    let backdrop: boolean = false;
	let width: number;
	let activateClickOutside = true;
    let drawerHidden: boolean = false;
    $: if (width >= breakPoint) {
		drawerHidden = false;
		activateClickOutside = false;
	} else {
		drawerHidden = true;
		activateClickOutside = true;
	}
	onMount(() => {
		if (width >= breakPoint) {
			drawerHidden = false;
			activateClickOutside = false;
		} else {
			drawerHidden = true;
			activateClickOutside = true;
		}
	});
    const toggleSide = () => {
		if (width < breakPoint) {
			drawerHidden = !drawerHidden;
		}
	};

</script>
<svelte:window bind:innerWidth={width} />
<Button
    on:click={() => (drawerHidden = false)} 
    class="focus:outline-none fixed start-0 top-20 whitespace-normal focus:ring-2 p-1.5 focus:ring-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 my-0 mx-2 lg:hidden">
    <BarsOutline class="w-6 h-6" />
</Button>
<Drawer
	transitionType="fly"
    {backdrop}
	{transitionParams}
	bind:hidden={drawerHidden}
	bind:activateClickOutside
    divClass="overflow-y-auto z-50 p-0 bg-white dark:bg-transparent"
    leftOffset="top-20 start-0 bottom-16"
	width="w-64"
	class="overflow-auto pb-32"
	id="sidebar"
>
    <div class="fixed flex w-64 items-right">
        <CloseButton on:click={() => (drawerHidden = true)} class="right-0 dark:text-white lg:hidden" />
    </div>
    <PostSidebar />
</Drawer>
<div class="flex px-4 mx-auto w-full">
    <article class="lg:ml-72 w-full mx-auto">
        <Heading>{ title }</Heading>

        <P class="date">on: { date }</P>

        <slot />
    </article>
</div>
