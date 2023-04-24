<media-player src="/music/Cranky.mp3" controls>
    <media-outlet></media-outlet>
  </media-player>

<script lang="ts">
    import { onMount } from 'svelte';
    import type { MediaCanPlayEvent }  from 'vidstack';
    // @ts-ignore
    import { title } from "$lib/store.ts";
    import 'vidstack/styles/defaults.css';

    import { defineCustomElements } from 'vidstack/elements';

    defineCustomElements();
    title.set('music');
    onMount(() => {
        const player = document.querySelector('media-player');
        player?.addEventListener('can-play', (event: MediaCanPlayEvent) => {
            player.currentTime = 5;
        });
    });
</script>