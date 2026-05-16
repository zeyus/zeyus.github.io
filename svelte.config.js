import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/**
 * Transforms <CodeBlock ...>raw code</CodeBlock> → <CodeBlock ... code={`raw code`} />
 * before Svelte's HTML parser runs, so angle brackets inside code don't need escaping.
 *
 * @returns {import('@sveltejs/kit').Config['preprocess'][number]}
 */
function codeBlockPreprocessor() {
	return {
		name: 'code-block-preprocessor',
		markup({ content }) {
			const transformed = content.replace(
				/<CodeBlock(\s[^>]*)?(?<!\/)>([^]*?)<\/CodeBlock>/g,
				(match, attrs = '', rawCode) => {
					if (/\bcode\s*=/.test(attrs)) return match;
					const trimmed = rawCode.trim();
					if (!trimmed) return match;
					const escaped = trimmed
						.replace(/\\/g, '\\\\')
						.replace(/`/g, '\\`')
						.replace(/\$\{/g, '\\${');
					return `<CodeBlock${attrs} code={\`${escaped}\`} />`;
				}
			);
			return { code: transformed };
		}
	};
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	preprocess: [
		codeBlockPreprocessor(),
		vitePreprocess({ script: true })
	],
	kit: {
		alias: {
			$components: './src/components',
			$assets: './src/_assets',
			$images: './src/_assets/images',
			$media: './src/_assets/media',
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			
			precompress: false,
			strict: true
		}),
		paths: {
			base: ''
		},
		output: {
			preloadStrategy: 'preload-mjs'
		},
		prerender: {
			handleHttpError: 'warn',
			crawl: true,
			handleMissingId: 'warn',

		},
	}
};

export default config;
