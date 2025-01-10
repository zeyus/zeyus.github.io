<script lang="ts">
    import { P, List, Li, A } from "flowbite-svelte";
	import { getContext } from "svelte";
	import type { MetadataContext } from "$lib/metadata.svelte";
    import Reference from "$components/Reference.svelte";
    
    let metaCtx = getContext<MetadataContext>('metadata');

    metaCtx.setMetadata({
        title: 'home',
        description: 'Hi, I\'m zeyus, the epitome of a generalist. I left industry to study cognitive science and now I\'m working on my PhD so I can specialize in generalism.',
    });
</script>

<P class="dark:text-gray-200 mb-0 mt-4">Hi, I'm zeyus, the epitome of a generalist. I left industry to study <A href="https://en.wikipedia.org/wiki/Cognitive_science">cognitive science</A> and now I'm working on my PhD so I can specialize in generalism.</P>
<List class="list-disc dark:text-gray-200 list-inside ml-3">
    <Li>Cognitive Scientist</Li>
    <Li>PhD student</Li>
    <Li><A href="https://github.com/zeyus">Open-source contributor and developer</A></Li>
    <Li>Ex-industry software engineer</Li>
    <Li><A href="https://soundcloud.com/zeyus">Musician</A></Li>
</List>
<P class="dark:text-gray-200">
    If you're interested in some stuff I write about, check out <A href="/_vault/">the _vault</A>, if you'd like to see some of the open source projects I've worked on, take a look at
    <A href="/projects/">the projects page</A>. If you just want to connect to your Arduino or other serial device directly from your browser, check out <A href="/terminal/">the terminal</A><Reference text="Requires a browser that supports the WebSerial or USB APIs" />.
</P>
