<script lang="ts">
    // vault home page, list of posts
    // import type { PageData } from './$types';
    import { sortPosts } from '$lib/utils.ts';
    import EnhancedImg from '$components/EnhancedImg.svelte';
    import { Heading } from 'flowbite-svelte';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';

    // let { data }: { data: PageData } = $props();
    import { page } from '$app/state';
    const posts = page.data.entries;

    // sort sidebar items by year,month, day descending
    posts.sort(sortPosts);
    
</script>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each posts as post}
        <a href={post.path}>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                <Heading tag="h2" class="mb-0 text-2xl font-bold text-primary-900 dark:text-primary-100">{post.props.title}</Heading>
                <p class="text-sm text-gray-500 dark:text-gray-400">{post.props.date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                {#if post.props.feature_image && post.props.feature_image?.src}
                    <EnhancedImg image={post.props.feature_image} path={post.path} hideTitle={true} imgClass="w-full h-48 object-cover object-center rounded-lg" />
                {/if}
                {#if post.props.excerpt}
                    <p class="mt-3 text-gray-700 dark:text-gray-300">{post.props.excerpt}</p>
                {/if}
                <div class="mt-4 flex items-center justify-end">
                    <span class="text-primary-500 dark:text-primary-400">Read more</span>
                    <ArrowRightOutline class="w-6 h-6 text-primary-500 dark:text-primary-400" />
                </div>
            </div>
        </a>
    {/each}
</div>
