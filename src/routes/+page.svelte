<script lang="ts">
    // @ts-ignore
    import { P, List, Li, A } from "flowbite-svelte";
    import { title } from "$lib/store.ts";
    title.set('home');
</script>

<P class="mb-0 mt-4">Hi, I'm zeyus:</P>
<P>
    <List class="list-disc list-inside ml-3">
        <Li>Cognitive Scientist</Li>
        <Li>PhD student</Li>
        <Li><A href="https://github.com/zeyus">Open-source contributor and developer</A></Li>
        <Li>Ex-industry software engineer</Li>
        <Li><A href="https://soundcloud.com/zeyus">Musician</A></Li>
    </List>
</P>
