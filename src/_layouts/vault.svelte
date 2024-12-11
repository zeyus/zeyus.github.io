<script context="module">
    import p from "../components/typo/p.svelte";
    import h1 from "../components/typo/h1.svelte";
    export { p, h1 };
</script>
<script>
    export let title;
    export let date;
    import { Heading, P } from "flowbite-svelte";
    import { title as t } from "$lib/store.ts";
    t.set("vault: " + title);

    // make date human readable
    let d = new Date(date);
    let options = { year: "numeric", month: "long", day: "numeric" };
    date = d.toLocaleDateString(undefined, options);

</script>
<article>
<Heading>{ title }</Heading>

<P class="date">on: { date }</P>

<slot />
</article>
