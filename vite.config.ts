import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
// import mkcert from "vite-plugin-mkcert";

export default defineConfig({
	plugins: [
		sveltekit(),
		// mkcert()
	],
	server: {
        // https: true,
        proxy: {}
    },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
