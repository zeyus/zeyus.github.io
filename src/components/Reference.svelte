<script lang="ts">
    import { page } from '$app/state';
    import { getContext } from 'svelte';
    import { Footnotes } from "$lib/footnotes.ts";

    let {
            item = $bindable(undefined),
            text = undefined,
            year = undefined,
            highlightClass = 'bg-primary-800/50'
        }:
        {
            item?: Footnote,
            text?: string,
            year?: number,
            highlightClass?: string
         } = $props();
    
    let items: Footnotes = getContext('bibItems');
    // is the item in items?
    if (item && !items.includes(item)) {
        item.occurrences = 1;
        items.addFootnote(item);
    } else if (text) {
        // look for the item in items
        const found = items.find((i) => i.text === text);
        if (found) {
            item = found;
            item?.addOccurrence(); 
        } else {
            const url = page.url.pathname;
            item = { text, url, year, occurrences: 1, addOccurrence: () => {if(item) item.occurrences++;} };
            items.addFootnote(item);
        }
    }

    /*@ts-ignore*/
    const index = items.indexOf(item);
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
    <a ontouchend={scrollToFootnote} onkeydown={scrollToFootnote} onclick={scrollToFootnote} href="#footnote-{index + 1}" data-occurrence={occurrence} class="footnote-ref footnote-{index + 1}-ref align-top text-xs text-primary-300">{index + 1}</a>
</sup>
