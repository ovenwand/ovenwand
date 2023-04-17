import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		sveltekit() // TODO Figure out how to mode this to @ovenwand/toolchain.presets.sveltekit
	]
});
