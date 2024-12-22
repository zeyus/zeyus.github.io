<script lang="ts">
    import { page } from '$app/state';
    import { List, Li } from 'flowbite-svelte';

    let { items = $bindable() }: { items: Footnote[] } = $props();

    let myItems = $derived(items.filter((item) => item.url === page.url.pathname));

</script>
{#if myItems.length > 0}
    <List class="footnotes w-full flex flex-col mt-12" position="inside">
        {#each myItems as item, index}
            <Li liClass="footnote text-sm list-none basis-full w-full flex">
                <a href="#footnote-{index + 1}-ref" class="footnote-ref align-top text-xs text-primary-300 mr-1">{index + 1}</a>
                {item.text}
            </Li>
        {/each}
    </List>
{/if}
