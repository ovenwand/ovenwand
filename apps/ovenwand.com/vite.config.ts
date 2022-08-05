import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import vue from '@vitejs/plugin-vue';
// import react from '@vitejs/plugin-react';

export default defineConfig({
	legacy: { buildSsrCjsExternalHeuristics: true }, // TODO Hopefully remove one day

	plugins: [
		basicSsl(),
		vue({
			include: /^(.*)\.vue$/,
			reactivityTransform: true
		}),
		sveltekit()
		// @vitejs/plugin-react throws with error about preamble, it seems to think
		// vite is not handling the index.html
		// react({
		// 	include: '**/*.tsx'
		// }),
	],

	envPrefix: ['VITE_', 'SENTRY_'], // TODO remove SENTRY_ from prefixes

	define: {
		'import.meta.env.APP_VERSION': JSON.stringify(process.env.npm_package_version)
	},

	server: {
		https: true,
		host: 'ovenwand.wtf'
	},

	ssr: {
		noExternal: ['@ovenwand/**'] // TODO hopefully remove one day?
	},

	optimizeDeps: {
		include: [
			// Dependency of @storyblok/svelte
			'axios',

			// SSR seems to trip when it tries to load 'cookie', which is a
			// dependency of @sentry/node. However '@sentry/node > cookie' does
			// not seem to do the trick
			'@sentry/node'
		]
	},

	resolve: {
		dedupe: ['react', 'react-dom']
	},

	esbuild: {
		jsxInject: `import React from 'react'`
	}
});
