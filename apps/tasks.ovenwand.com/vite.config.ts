import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],

	define: {
		'import.meta.env.APP_VERSION': JSON.stringify(process.env.npm_package_version)
	},

	server: {
		https: true,
		host: 'tasks.ovenwand.wtf',
		port: 80
	}
});
