import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	extensions: ['.svelte'],
	preprocess: [
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
