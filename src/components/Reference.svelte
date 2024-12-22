<script lang="ts">
    import { page } from '$app/state';

    let {
            item = $bindable(undefined),
            items = $bindable([]),
            text = undefined,
            year = undefined,
        }:
        {
            item?: Footnote,
            items: Footnote[],
            text?: string,
            year?: number,
         } = $props();
    
    // is the item in items?
    if (item && !items.includes(item)) {
        items.push(item);
    } else if (text) {
        // look for the item in items
        const found = items.find((i) => i.text === text);
        if (found) { item = found; } else {
            const url = page.url.pathname;
            item = { text, url, year };
            items.push(item);
        }
    }

    $inspect(items);
    /*@ts-ignore*/
    const index = items.indexOf(item);

</script>
<sup id="footnote-{index}" class="footnote">
    <a href="#footnote-{index}-ref" class="footnote-ref align-top text-xs text-primary-300">{index + 1}</a>
</sup>
