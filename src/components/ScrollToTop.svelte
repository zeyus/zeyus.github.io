<script lang="ts">
	import { ArrowUpOutline } from 'flowbite-svelte-icons';

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
		class="fixed right-6 bottom-4 z-50 rounded-full bg-primary-600 p-2 text-white shadow-lg dark:bg-primary-600"
		on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
		aria-label="Scroll to top"
	>
		<ArrowUpOutline class="h-6 w-6" />
	</button>
{/if}
