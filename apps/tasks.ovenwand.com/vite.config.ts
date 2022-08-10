import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
	plugins: [basicSsl(), sveltekit()],

	define: {
		'import.meta.env.APP_VERSION': JSON.stringify(process.env.npm_package_version)
	},

	server: {
		https: true,
		host: 'tasks.ovenwand.wtf'
	}
});
