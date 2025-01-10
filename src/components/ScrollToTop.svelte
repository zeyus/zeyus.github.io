<script lang="ts">
    import { ArrowUpOutline } from "flowbite-svelte-icons";
    

    let show = false;

    let handleScroll = () => {
        if (window.scrollY > 100) {
            show = true;
        } else {
            show = false;
        }
    };

</script>
<svelte:window onscroll={handleScroll} />

{#if show}
    <button
        class="fixed bottom-4 right-4 z-50 p-2 bg-primary-600 dark:bg-primary-600 text-white rounded-full shadow-lg"
        on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
    >
        <ArrowUpOutline class="w-6 h-6" />
    </button>
{/if}
