<script lang="ts">
	import { onMount } from 'svelte';
	import storage from '$lib/store';

	type Theme = 'auto' | 'light' | 'dark';
	const order: Theme[] = ['auto', 'light', 'dark'];

	// same key/format as the inline script in app.html
	const theme = storage<Theme>('theme', 'auto');

	const apply = (t: Theme) => {
		const dark =
			t === 'auto' ? window.matchMedia('(prefers-color-scheme: dark)').matches : t === 'dark';
		document.documentElement.classList.toggle('dark', dark);
	};

	const cycle = () => {
		theme.set(order[(order.indexOf($theme) + 1) % order.length]);
	};

	onMount(() => {
		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = () => $theme === 'auto' && apply('auto');
		mq.addEventListener('change', onChange);
		const unsubscribe = theme.subscribe(apply);
		return () => {
			mq.removeEventListener('change', onChange);
			unsubscribe();
		};
	});
</script>

<button
	type="button"
	onclick={cycle}
	class="theme-toggle ms-2 shrink-0 cursor-pointer text-xs text-fg-muted hover:text-accent-strong"
	aria-label="Colour theme: {$theme}. Click to change."
	title="Colour theme: auto (system) → light → dark"
>
	[<span class="hidden sm:inline">theme:</span>{$theme}]
</button>

<style>
	.theme-toggle {
		font-family: var(--font-mono);
	}
</style>
