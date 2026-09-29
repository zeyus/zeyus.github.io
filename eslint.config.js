import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

export default ts.config(
	{
		ignores: ['build/', '.svelte-kit/', 'package/', 'node_modules/']
	},
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: {
			// typescript already checks this, and it misfires on ambient types (App, Footnote, ...)
			'no-undef': 'off',
			// all {@html} content is authored in this repo (footnotes, project blurbs)
			'svelte/no-at-html-tags': 'off',
			// the site is served from the domain root, so plain hrefs are fine
			'svelte/no-navigation-without-resolve': ['error', { ignoreLinks: true }],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }
			]
		}
	},
	{
		// adapted from third-party code (Google's web-serial-polyfill), keep diffs from upstream small
		files: ['src/lib/serial2.ts', 'src/lib/webserial-polyfill.ts'],
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'prefer-const': ['error', { destructuring: 'all' }]
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	}
);
