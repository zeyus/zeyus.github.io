<script lang="ts">
    import Terminal from "$components/Terminal.svelte";
    // @ts-ignore
    import { title, pageDescription, ogImage, defaultImage } from "$lib/store.ts";
    title.set('terminal');
    ogImage.set(defaultImage);
    pageDescription.set('A working web-based serial terminal that can be used to interact with a microcontroller or any other serial devices connected to your PC. Right from your browser!');
</script>

<Terminal/>
