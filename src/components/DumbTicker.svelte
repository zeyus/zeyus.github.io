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
				<span class="font-mono text-xs text-fg-subtle"
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
		class="ticker my-6 flex w-full items-center overflow-hidden rounded-lg border border-line bg-surface-2"
	>
		<span class="shrink-0 border-e border-line px-3 py-2 font-mono text-xs text-accent"
			>tail -f {label}</span
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
