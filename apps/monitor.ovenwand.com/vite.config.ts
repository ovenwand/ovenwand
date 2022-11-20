import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		sveltekit(), // TODO Figure out how to move this to @ovenwand/toolchain.presets.sveltekit
	],

	envPrefix: [
		'VERCEL_',
		'SENTRY_' // TODO remove SENTRY_ from prefixes
	],
});
