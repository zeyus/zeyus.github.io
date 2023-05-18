<script lang="ts">
    import Terminal from "../../components/Terminal.svelte";
    // @ts-ignore
    import { title } from "$lib/store.ts";
    title.set('terminal');
</script>

<Terminal/>