import { existsSync } from 'node:fs';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import autoSlug from '@svelte-put/preprocess-auto-slug';

// shorthands accepted by <CodeBlock lang="...">; anything else has to be the name of a
// svelte-highlight language module (node_modules/svelte-highlight/languages/<name>.js)
const LANG_ALIASES = {
	sh: 'bash',
	shell: 'bash',
	js: 'javascript',
	ts: 'typescript',
	py: 'python',
	html: 'xml',
	yml: 'yaml',
	md: 'markdown',
	rs: 'rust',
	'c++': 'cpp'
};

/**
 * Does two things to every <CodeBlock> before Svelte's HTML parser runs:
 *
 * 1. <CodeBlock ...>raw code</CodeBlock> → <CodeBlock ... code={`raw code`} />, so angle
 *    brackets inside code don't need escaping.
 * 2. lang="bash" → lang={__hl_bash}, plus an import of that one language into the file's
 *    <script>. That way a page only ships the highlight.js grammars it actually uses,
 *    instead of CodeBlock bundling every language it might be asked for.
 *
 * @returns {import('@sveltejs/kit').Config['preprocess'][number]}
 */
function codeBlockPreprocessor() {
	return {
		name: 'code-block-preprocessor',
		markup({ content, filename }) {
			if (!content.includes('<CodeBlock')) return;
			const languages = new Set();

			let transformed = content.replace(
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

			// only the tag's leading attributes are looked at, so a `lang=` inside the code is safe
			transformed = transformed.replace(
				/<CodeBlock(?=[\s/>])((?:\s+(?!code\b)[\w:-]+(?:=(?:"[^"]*"|'[^']*'|\{[^{}]*\}))?)*)/g,
				(match, attrs) => {
					// lang={expression} is passed through: the caller supplies the language object
					if (/\slang=\{/.test(attrs)) return match;
					const given = attrs.match(/\slang=(?:"([^"]*)"|'([^']*)')/);
					const name = given ? (given[1] ?? given[2]) : 'bash';
					const language = LANG_ALIASES[name] ?? name;
					if (!existsSync(`node_modules/svelte-highlight/languages/${language}.js`)) {
						throw new Error(`${filename}: <CodeBlock lang="${name}"> is not a known language`);
					}
					languages.add(language);
					const local = `__hl_${language.replace(/\W/g, '_')}`;
					return given ? match.replace(given[0], ` lang={${local}}`) : `${match} lang={${local}}`;
				}
			);
			if (languages.size === 0) return { code: transformed };

			// kept on the <script> line so line numbers in errors still match the source
			const imports = [...languages]
				.map((l) => `import __hl_${l.replace(/\W/g, '_')} from 'svelte-highlight/languages/${l}';`)
				.join('');
			const instanceScript = /<script(?![^>]*\b(?:module|context=))[^>]*>/;
			transformed = instanceScript.test(transformed)
				? transformed.replace(instanceScript, (tag) => tag + imports)
				: `<script>${imports}</script>` + transformed;

			return { code: transformed };
		}
	};
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	preprocess: [
		codeBlockPreprocessor(),
		vitePreprocess({ script: true }),
		autoSlug({
			anchor: {
				position: 'append',
				content: '#'
			}
		})
	],
	kit: {
		alias: {
			$components: './src/components',
			$assets: './src/_assets',
			$images: './src/_assets/images',
			$media: './src/_assets/media'
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
			handleMissingId: 'warn'
		}
	}
};

export default config;
