import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), mkcert()],
	css: {},
	server: { https: {}, proxy: {} },
	test: { include: ['src/**/*.{test,spec}.{js,ts}'] }
});
