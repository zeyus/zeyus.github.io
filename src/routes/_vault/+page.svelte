<script lang="ts">
	// vault home page, list of posts
	// import type { PageData } from './$types';
	import { sortPosts } from '#lib/utils.ts';
	import EnhancedImg from '$components/EnhancedImg.svelte';

	// let { data }: { data: PageData } = $props();
	import { page } from '$app/state';
	let posts = page.data.posts;

	// sort sidebar items by year,month, day descending
	posts.sort(sortPosts);
</script>

<p class="term-prompt">
	<span class="text-accent">anon@zeyus</span>:~/_vault$ ls -lt
	<span class="text-fg-subtle">({posts.length} entries)</span>
</p>
<div class="vault-grid">
	{#each posts as post (post.path)}
		<a href={post.path} class="term-card vault-card">
			{#if post.props.feature_image && post.props.feature_image?.src}
				<EnhancedImg
					image={post.props.feature_image}
					path={post.path}
					hideTitle={true}
					expand={false}
					sizes="(min-width: 640px) 560px, 100vw"
					figClass="vault-card-img"
					imgClass="w-full h-44 object-cover object-center rounded-md"
				/>
			{/if}
			<span class="vault-card-date"
				>{post.props.date.toLocaleDateString(undefined, {
					year: 'numeric',
					month: 'short',
					day: '2-digit'
				})}</span
			>
			<span class="vault-card-title" role="heading" aria-level="2">{post.props.title}</span>
			{#if post.props.excerpt}
				<p class="vault-card-excerpt">{post.props.excerpt}</p>
			{/if}
			<span class="vault-card-more">cat {post.path.split('/').filter(Boolean).at(-1)} →</span>
		</a>
	{/each}
</div>

<style>
	.vault-grid {
		columns: 22rem;
		column-gap: 1.5rem;
		margin-bottom: -1.5rem;
	}

	.vault-card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
		padding: 1.5rem;
		font-size: 1rem;
		break-inside: avoid;
	}

	:global(.vault-card-img) {
		margin: -0.5rem -0.5rem 0.5rem !important;
	}

	.vault-card-date {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-fg-subtle);
	}

	.vault-card-title {
		margin: 0;
		font-family: 'Mechanical Bold', serif;
		font-size: 1.5rem;
		line-height: 1.2;
		color: var(--color-fg-strong);
	}

	.vault-card-excerpt {
		margin: 0.25rem 0 0.5rem;
		line-height: 1.6;
		color: var(--color-fg-muted);
	}

	.vault-card-more {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-accent-strong);
	}

	.vault-card:hover .vault-card-more {
		text-shadow: 0 0 8px var(--color-glow);
	}
</style>
