import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],

	envPrefix: ['VITE_', 'SENTRY_'],

	server: {
		https: true
	},

	optimizeDeps: {
		include: ['axios', '@ovenwand/monitor']
	}
});
