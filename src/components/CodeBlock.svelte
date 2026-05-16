<script lang="ts">
	import { Highlight } from 'svelte-highlight';
	import LangTag from 'svelte-highlight/LangTag.svelte';
	import { type LanguageType } from 'svelte-highlight/languages';
	import { bash } from 'svelte-highlight/languages/bash';
	import { diff } from 'svelte-highlight/languages/diff';
	import { javascript } from 'svelte-highlight/languages/javascript';
	import { typescript } from 'svelte-highlight/languages/typescript';
	import { python } from 'svelte-highlight/languages/python';
	import { css } from 'svelte-highlight/languages/css';
	import { ini } from 'svelte-highlight/languages/ini';
	import { xml } from 'svelte-highlight/languages/xml';
	import { json } from 'svelte-highlight/languages/json';
	import { yaml } from 'svelte-highlight/languages/yaml';
	import { markdown } from 'svelte-highlight/languages/markdown';
	import { rust } from 'svelte-highlight/languages/rust';
	import { go } from 'svelte-highlight/languages/go';
	import { c } from 'svelte-highlight/languages/c';
	import { cpp } from 'svelte-highlight/languages/cpp';
	import { Button } from 'flowbite-svelte';
	import { ClipboardCleanOutline } from 'flowbite-svelte-icons';
	import { fade } from 'svelte/transition';
	import 'svelte-highlight/styles/dark-violet.css';

	const LANGS: Record<string, LanguageType<string>> = {
		bash,
		sh: bash,
		shell: bash,
		diff,
		ini,
		javascript,
		js: javascript,
		typescript,
		ts: typescript,
		python,
		py: python,
		css,
		html: xml,
		xml,
		json,
		yaml,
		yml: yaml,
		markdown,
		md: markdown,
		rust,
		rs: rust,
		go,
		c,
		cpp,
		'c++': cpp
	};

	interface Props {
		lang?: string | LanguageType<string>;
		code?: string;
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
		langtagColor = 'rgb(192 38 211)',
		langtagTop = '-2.5rem',
		langtagRight = '-.50rem',
		highlightClass = '',
		langtag = true
	}: Props = $props();

	const language: LanguageType<string> = (() =>
		typeof lang === 'string' ? (LANGS[lang] ?? bash) : lang)();

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
				class="m-0 h-8 w-8 cursor-pointer p-1 text-gray-500 dark:text-gray-400 dark:hover:text-white"
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
