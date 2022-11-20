import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig({
	plugins: [
		viteCommonjs(),
		sveltekit(), // TODO Figure out how to mode this to @ovenwand/toolchain.presets.sveltekit
	],

	envPrefix: [
		'VERCEL_',
		'SENTRY_' // TODO remove SENTRY_ from prefixes
	],
});
