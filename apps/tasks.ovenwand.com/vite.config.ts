import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig({
	plugins: [viteCommonjs(), sveltekit()],

	define: {
		'import.meta.env.APP_VERSION': JSON.stringify(process.env.npm_package_version)
	},

	server: {
		host: 'tasks.ovenwand.wtf'
	}
});
