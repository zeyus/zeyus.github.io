<script lang="ts">
    import Terminal from "$components/Terminal.svelte";
	import type { MetadataContext } from "$lib/metadata.svelte";
	import { getContext } from "svelte";

    let metaCtx = getContext<MetadataContext>('metadata');

    metaCtx.setMetadata({
        title: 'terminal',
        description: 'A working web-based serial terminal that can be used to interact with a microcontroller or any other serial devices connected to your PC. Right from your browser!',
    });
</script>

<Terminal/>
