<script lang="ts">
    import { page } from '$app/state';
    import { getContext } from 'svelte';
    import type { FootnotesContext } from "$lib/footnotes.svelte";

    let {
            item = $bindable(undefined),
            text = "Invalid item, either an item or text must be provided",
            year = undefined,
            highlightClass = 'bg-primary-800/50'
        }:
        {
            item?: Footnote,
            text?: string,
            year?: number,
            highlightClass?: string
         } = $props();
    
    let footnotes: FootnotesContext = getContext<FootnotesContext>('footnotes');
    // is the item in items?
    if (item && !footnotes.hasFootnote(item)) {
        item.occurrences = 1;
        footnotes.addFootnote(item);
    } else if (text) {
        // look for the item in items
        const found = footnotes.findFootnote(text, () => page.url.pathname);
        if (found()) {
            item = found();
            if (item) item.occurrences++; 
        } else {
            let url = page.url.pathname;
            item = { text, url, year, occurrences: 1 };
            footnotes.addFootnote(item);
        }
    }

    const index = footnotes.indexOf(item);
    const occurrence = item?.occurrences || 1;
    const scrollToFootnote = (e: MouseEvent | TouchEvent | KeyboardEvent) => {
        if (e instanceof KeyboardEvent) {
            if (e.key !== 'Enter') return;
        }
        e.preventDefault();
        const id = (e.target as HTMLAnchorElement).href.split('#')[1];
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
        // get the child button element
        const button = el.querySelector('button');
        if (button) button.focus();
        // add data-return-to to the element
        el.setAttribute('data-return-to', occurrence.toString());
        // flash the element once
        el.classList.add(highlightClass);
        setTimeout(() => {
            el.classList.remove(highlightClass);
        }, 1000);
        
    };

</script>
<sup class="footnote-ref-sup">
    <a ontouchend={scrollToFootnote} onkeydown={scrollToFootnote} onclick={scrollToFootnote} href="#footnote-{index() + 1}" data-occurrence={occurrence} class="footnote-ref footnote-{index() + 1}-ref align-top text-xs text-primary-300">{index() + 1}</a>
</sup>
