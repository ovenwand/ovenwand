import { defineConfig } from '@ovenwand/toolchain.plugins.vite';
// import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [
		// @vitejs/plugin-react throws with error about preamble, it seems to think
		// vite is not handling the index.html
		// react({
		// 	include: '**/*.tsx'
		// }),
	],

	resolve: {
		dedupe: ['react', 'react-dom']
	},

	esbuild: {
		jsxInject: `import React from 'react'`
	},
});
