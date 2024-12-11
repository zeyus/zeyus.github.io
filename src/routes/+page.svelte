<script lang="ts">
    // @ts-ignore
    import { P, List, Li, A } from "flowbite-svelte";
    import { title } from "$lib/store.ts";
    title.set('home');
</script>

<P class="dark:text-gray-200 mb-0 mt-4">Hi, I'm zeyus, the epitome of a generalist. I left industry to study <A href="https://en.wikipedia.org/wiki/Cognitive_science">cognitive science</A> and now I'm working on my PhD so I can specialize in generalism.</P>
<P>
    <List class="list-disc dark:text-gray-200 list-inside ml-3">
        <Li>Cognitive Scientist</Li>
        <Li>PhD student</Li>
        <Li><A href="https://github.com/zeyus">Open-source contributor and developer</A></Li>
        <Li>Ex-industry software engineer</Li>
        <Li><A href="https://soundcloud.com/zeyus">Musician</A></Li>
    </List>
</P>
