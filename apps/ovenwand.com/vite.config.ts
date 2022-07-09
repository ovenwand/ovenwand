import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],

	envPrefix: ['VITE_', 'SENTRY_'], // TODO remove SENTRY_ from prefixes

	define: {
		'import.meta.env.APP_VERSION': JSON.stringify(process.env.npm_package_version)
	},

	server: {
		https: true
	},

	optimizeDeps: {
		include: ['axios']
	}
});
