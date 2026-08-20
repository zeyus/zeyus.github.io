<script lang="ts">
	/**
	 * A ticker for showing a rotating list of the latest blog/_vault posts
	 * Accepts posts in the same format as the blog/_vault post list for the sidebar
	 */
	import { sortPosts } from '$lib/utils.ts';
	import { A } from 'flowbite-svelte';

	let {
		posts,
		label = 'latest',
		limit = 10,
		secondsPerPost = 6
	}: {
		posts?: App.VaultEntries[];
		label?: string;
		limit?: number;
		secondsPerPost?: number;
	} = $props();

	// newest first, and never more than a handful
	const items = $derived([...(posts || [])].sort(sortPosts).slice(0, limit));

	// keep the scroll speed constant no matter how many posts there are
	const duration = $derived(Math.max(items.length, 1) * secondsPerPost);

	const dateOptions: Intl.DateTimeFormatOptions = {
		year: '2-digit',
		month: 'short',
		day: 'numeric'
	};
</script>

{#snippet track(duplicate: boolean)}
	<ul
		class="flex shrink-0 list-none items-center gap-8 ps-0 pe-8"
		aria-hidden={duplicate || undefined}
	>
		{#each items as post (post.path)}
			<li class="flex items-center gap-2 text-sm whitespace-nowrap">
				<span class="text-xs text-gray-500 dark:text-gray-400"
					>{post.props.date.toLocaleDateString(undefined, dateOptions)}</span
				>
				<A href={post.path} tabindex={duplicate ? -1 : undefined}
					>{post.props.short_title || post.props.title}</A
				>
			</li>
		{/each}
	</ul>
{/snippet}

{#if items.length}
	<div
		class="ticker mx-auto my-4 flex w-1/2 items-center overflow-hidden rounded-lg border border-gray-200 bg-white/50 dark:border-zinc-700 dark:bg-zinc-900/50"
	>
		<span
			class="shrink-0 border-e border-gray-200 px-3 py-2 text-xs font-bold tracking-wide text-primary-600 uppercase dark:border-zinc-700 dark:text-primary-500"
			>{label}</span
		>
		<div class="ticker-viewport flex-1 overflow-hidden py-2 ps-4">
			<div class="ticker-track flex w-max" style="--ticker-duration: {duration}s">
				{@render track(false)}
				{@render track(true)}
			</div>
		</div>
	</div>
{/if}

<style>
	.ticker-track {
		animation: ticker-scroll var(--ticker-duration, 60s) linear infinite;
	}

	/* pause so people can actually click a link */
	.ticker:hover .ticker-track,
	.ticker:focus-within .ticker-track {
		animation-play-state: paused;
	}

	@keyframes ticker-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.ticker-track {
			animation: none;
		}
		.ticker-viewport {
			overflow-x: auto;
		}
	}
</style>
