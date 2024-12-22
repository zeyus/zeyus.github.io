<script lang="ts">
    import { page } from '$app/state';
    import { getContext } from 'svelte';

    let {
            item = $bindable(undefined),
            text = undefined,
            year = undefined,
        }:
        {
            item?: Footnote,
            text?: string,
            year?: number,
         } = $props();
    
    let items: () => Footnote[] = getContext('bibItems');
    // is the item in items?
    if (item && !items().includes(item)) {
        items().push(item);
    } else if (text) {
        // look for the item in items
        const found = items().find((i) => i.text === text);
        if (found) { item = found; } else {
            const url = page.url.pathname;
            item = { text, url, year };
            items().push(item);
        }
    }

    /*@ts-ignore*/
    const index = items().indexOf(item);

</script>
<sup id="footnote-{index}" class="footnote">
    <a href="#footnote-{index}-ref" class="footnote-ref align-top text-xs text-primary-300">{index + 1}</a>
</sup>
