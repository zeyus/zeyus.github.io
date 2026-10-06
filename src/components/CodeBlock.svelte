<script lang="ts">
	import { Highlight } from 'svelte-highlight';
	import LangTag from 'svelte-highlight/LangTag.svelte';
	import { type LanguageType } from 'svelte-highlight/languages';
	import { plaintext } from 'svelte-highlight/languages/plaintext';
	import { Button } from 'flowbite-svelte';
	import { ClipboardCleanOutline } from 'flowbite-svelte-icons';
	import { fade } from 'svelte/transition';
	import 'svelte-highlight/styles/dark-violet.css';

	interface Props {
		// codeBlockPreprocessor (vite.config.ts) swaps a lang="name" for the imported language
		// object, so only the languages a page uses are bundled; a string only gets here if
		// that didn't happen, and is shown without highlighting
		lang?: string | LanguageType<string>;
		code?: string;
		// only for type-checking: codeBlockPreprocessor (vite.config.ts) turns children into `code`
		children?: import('svelte').Snippet;
		langtagColor?: string;
		langtagTop?: string;
		langtagRight?: string;
		highlightClass?: string;
		langtag?: boolean;
	}

	let {
		lang = 'bash',
		code = '',
		children: _children,
		langtagColor = 'rgb(192 38 211)',
		langtagTop = '-2.5rem',
		langtagRight = '-.50rem',
		highlightClass = '',
		langtag = true
	}: Props = $props();

	const language: LanguageType<string> = (() =>
		typeof lang === 'string' ? { ...plaintext, name: lang } : lang)();

	let copied = $state(false);

	async function copyCode(e: MouseEvent | TouchEvent | KeyboardEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Enter') return;
		await navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	}
</script>

<div class="codeblock relative">
	<Highlight
		let:highlighted
		--langtag-color={langtagColor}
		--langtag-top={langtagTop}
		--langtag-right={langtagRight}
		class={highlightClass}
		{language}
		{code}
	>
		<Button
			outline={false}
			onkeyup={copyCode}
			ontouchend={copyCode}
			onclick={copyCode}
			class="absolute inset-e-4 top-4 z-10 h-8 w-8 p-0"
		>
			<ClipboardCleanOutline
				class="m-0 h-8 w-8 cursor-pointer p-1 text-gray-400 hover:text-white"
			/>
		</Button>
		{#if copied}
			<span
				transition:fade={{ duration: 150 }}
				class="absolute inset-e-14 top-5 z-10 rounded bg-gray-800 px-2 py-0.5 text-xs text-white"
			>
				Copied!
			</span>
		{/if}
		<LangTag {highlighted} languageName={language.name} code={false} {langtag} />
	</Highlight>
</div>

<style>
	div.codeblock {
		margin-top: 0;
		margin-bottom: 2rem;
	}
</style>
