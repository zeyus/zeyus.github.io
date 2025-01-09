import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vitest/config';
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit(),
		mkcert()
	],
	server: {
        https: true,
        proxy: {}
    },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
