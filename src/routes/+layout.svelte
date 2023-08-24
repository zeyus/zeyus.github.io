<script>
    import "../app.postcss";
    import { Heading } from "flowbite-svelte";
    // @ts-ignore
    import { title } from "$lib/store.ts";
    import NavMenu from "../components/NavMenu.svelte";
</script>
<svelte:head>
	<title>{$title} - zeyus dot com</title>
</svelte:head>
<NavMenu />
<div class="container mx-auto">
<Heading tag="h1" class="mt-4 mb-4">{$title}</Heading>
<slot />
</div>