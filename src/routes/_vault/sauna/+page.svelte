<script lang="ts">
    import type { HTMLImgAttributes } from 'svelte/elements';
    import { ImagePlaceholder, P } from 'flowbite-svelte';
    import { getContext } from 'svelte';
    import Reference from '../../../components/Reference.svelte';
    // import { galleryImg } from '../../../components/snips.svelte';
    const imageModules = import.meta.glob(
		'./images/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
		{
			eager: true,
			query: {
				enhanced: true
			}
		}
	);
    const vaultModules = import.meta.glob(
		'$assets/images/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
		{
			eager: true,
			query: {
				enhanced: true
			}
		}
	);
    console.log(vaultModules);
    let images = getContext<() => HTMLImgAttributes[]>('images')();
    const imgModule = async (image: HTMLImgAttributes): Promise<any>  => {
        if (!image.src) return null;
        const module = imageModules[image.src];
        console.log(imageModules);
        return module;
    };
</script>
{#snippet galleryImg(image: HTMLImgAttributes)}
    <figure>
        {#await imgModule(image)}
              <ImagePlaceholder />
        {:then im} 
            {#if (typeof im !== 'undefined' && im !== null)}
                {console.log(im)}
                <enhanced:img src={im.default} alt={image.alt || ""} />
            {/if}
              
        {/await}
        
        {#if image.title}
            <figcaption>{image.title}</figcaption>
        {/if}
    </figure>
{/snippet}
<P>
    So, one side of my family is from Finland, and one of the consistencies of both places I lived during my childhood 
    was the presence of a sauna. <Reference text="These places were in vastly different locations, the first was near Sydney, and the second was in the middle of nowhere." />
</P>
<P>
  Since moving to Denmark several years ago, we ended up buying a house which had a wood shed on the property, and I knew it would be 
  the perfect place for a sauna. Although, I had to wait for a while to save up enough money and
  there were other projects that were more urgent.<Reference text="Stuff like radon mitigation, dealing with mold, that kind of fun stuff" />
</P>
{@render galleryImg(images[0])}
<P>
  The time finally came, and I started planning
</P>
