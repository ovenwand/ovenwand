import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		sveltekit() // TODO Figure out how to move this to @ovenwand/toolchain.presets.sveltekit
	],

	optimizeDeps: {
		include: [
			// Dependency of @storyblok/svelte
			'axios'

			// SSR seems to trip when it tries to load 'cookie', which is a
			// dependency of @sentry/node. However '@sentry/node > cookie' does
			// not seem to do the trick
			// '@sentry/node'
		]
	}
});
