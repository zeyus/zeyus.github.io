<script lang="ts">
    import { List, Li } from 'flowbite-svelte';

  
    let { items = $bindable([]), highlightClass = 'bg-primary-800/50' }: {
        items: Footnote[],
        highlightClass?: string
    } = $props();

    const transitionClass = ['transition', 'ease-in-out', 'duration-300', 'delay-150'];

    function scrollToFootnote(e: MouseEvent | TouchEvent | KeyboardEvent) {
        if (e instanceof KeyboardEvent) {
            if (e.key !== 'Enter') return;
        }
        e.preventDefault();
        const occurrence = (e.target as HTMLButtonElement)?.parentElement?.getAttribute('data-return-to');
        const targetClass = (e.target as HTMLButtonElement).getAttribute('data-target');
        if (!targetClass) return;
        const els = document.getElementsByClassName(targetClass);
        if (!els) return;
        let el: HTMLElement | null = null;
        for (let i = 0; i < els.length; i++) {
            if (els[i].getAttribute('data-occurrence') === occurrence) {
                el = els[i] as HTMLElement;
                break;
            }
        }
        if (!el) {
            el = els[0] as HTMLElement;
        }
        
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        });
        el.focus();
        // flash the element once as well as previous sibling (or parent if none)
        el.classList.add(...transitionClass);
        el.classList.add(highlightClass);
        setTimeout(() => {
            el.classList.remove(highlightClass);
        }, 1000);
        setTimeout(() => {
            el.classList.remove(...transitionClass);
        }, 1900);
        const container = el.closest('.footnote-ref-sup');
        if (!container) return;
        const parent = container.parentElement;
        if (parent) {
            parent.classList.add(...transitionClass);
            parent.classList.add(highlightClass);
            setTimeout(() => {
                parent.classList.remove(highlightClass);
            }, 1000);
            setTimeout(() => {
                parent.classList.remove(...transitionClass);
            }, 1900);
        }
    }

</script>
{#if items.length > 0}
    <div class="w-100 mt-12 mb-4">
        <div class="w-64 border-t border-slate-400 -ml-4"></div>
    </div>
    <List class="w-full flex flex-col" position="inside">
        {#each items as item, index}
            <Li id="footnote-{index + 1}" class="mb-2 footnote text-sm list-none basis-full w-full flex justify-start content-start {transitionClass.join(' ')}">
                <button type="button" data-target="footnote-{index + 1}-ref" ontouchend={scrollToFootnote} onkeydown={scrollToFootnote} onclick={scrollToFootnote} class="h-5 ml-0 my-0 footnote-id object-top align-top text-xs text-primary-300 mr-1"
                 aria-label="Scroll back to reference" 
                >{index + 1}</button>
                {item.text}
            </Li>
        {/each}
    </List>
{/if}
