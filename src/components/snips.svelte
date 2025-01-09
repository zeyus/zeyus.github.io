<svelte:options runes={true} />
<script lang="ts" module>
    import type { HTMLImgAttributes } from 'svelte/elements';
    export { galleryImg };
</script>
{#snippet galleryImg(image: HTMLImgAttributes)}
	<figure>
		<img src={image.src} alt={image.alt} width={image.width} height={image.height} />
        {#if image.title}
            <figcaption>{image.title}</figcaption>
        {/if}
	</figure>
{/snippet}
