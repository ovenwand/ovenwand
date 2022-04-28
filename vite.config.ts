import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte({
			experimental: {
				useVitePreprocess: true
			}
		})
	],
	define: {
		// Bugfix for error in cypress / @testing-library/svelte
		'process.env': {}
	}
});
