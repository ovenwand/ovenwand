import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	legacy: { buildSsrCjsExternalHeuristics: true }, // TODO Hopefully remove one day

	plugins: [
		sveltekit()
	],

	define: {
		'import.meta.env.APP_VERSION': JSON.stringify(process.env.npm_package_version)
	},

	server: {
		host: 'monitor.ovenwand.wtf'
	},

	ssr: {
		noExternal: ['@ovenwand/**'], // TODO hopefully remove one day?
	},
});
