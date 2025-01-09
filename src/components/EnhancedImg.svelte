<script lang="ts">
    /**
     * Note: this doesn't work at runtime sadly.
     * This means that images preloaded as modules will not be able to benefit from filters, transforms etc
     * It still provides optimized versions of the original images
     * */
    import { page } from '$app/state';
    import { imageToModuleDefault } from "$lib/assets";

    let { 
        image,
        figClass = "max-w-full",
        imgClass = "rounded-lg object-cover max-w-full w-full",
        captionClass = "mt-2 text-sm text-center text-gray-500 dark:text-gray-400",
        sizes = "",
        transform = [],
    } = $props();
    let srcSuffix = transform.length > 0 ? "?" + transform.join("&") : "";
    // let imgSrc = imageToModuleDefault(image.src + srcSuffix, page.url.pathname, page.data.imageModules);
    let imgSrc = imageToModuleDefault(image.src, page.url.pathname, page.data.imageModules);
</script>
<figure class="{figClass}">
    {#if sizes !== "" && false}
        <enhanced:img src="{imgSrc}" alt="{image.alt}" class="{imgClass}" sizes="{sizes}" />
    {:else}
        <enhanced:img src="{imgSrc}" alt="{image.alt}" class="{imgClass}" />
    {/if}
    {#if image.title}
        <figcaption class={captionClass}>{image.title}</figcaption>
    {/if}
</figure>
