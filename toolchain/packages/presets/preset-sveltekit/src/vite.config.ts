import { defineConfig } from 'vite';
// import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	legacy: { buildSsrCjsExternalHeuristics: true }, // TODO Hopefully remove one day

	// Doesn't seem to work when included from a preset
	// plugins: [
	// 	sveltekit(),
	// ],

	ssr: {
		noExternal: ['@ovenwand/**'] // TODO hopefully remove one day?
	}
});
