<script lang="ts" module>
    export const createFootnote = (text: string): Footnote => {
        return { text, url: '', occurrences: 1 };
    };
</script>
<script lang="ts">
    let {
            item,
            items = $bindable([]),
            highlightClass = 'bg-primary-800/50'
        }:
        {
            item: Footnote,
            items: Footnote[],
            highlightClass?: string
         } = $props();
    
    // is the item in items? Compare by text instead of reference to avoid proxy issues
    let foundIndex = items.findIndex(i => i.text === item.text);
    if (foundIndex === -1) {
        item.occurrences = 1;
        items.push(item);
        foundIndex = items.length - 1;
    }

    let index = $derived(items.findIndex(i => i.text === item.text));
    let occurrence = $derived(item.occurrences || 1);
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
{#if index >= 0}
    <sup class="footnote-ref-sup">
        <a ontouchend={scrollToFootnote} onkeydown={scrollToFootnote} onclick={scrollToFootnote} href="#footnote-{index + 1}" data-occurrence={occurrence} class="footnote-ref footnote-{index + 1}-ref align-top text-xs text-primary-300">{index + 1}</a>
    </sup>
{/if}
