import { env } from 'node:process';
import { defineConfig } from 'vite';

export default defineConfig({
	// TODO remove in favor of environment variable
	define: {
		'import.meta.env.APP_VERSION': JSON.stringify(env.VERSION),
	},

	envPrefix: [
		'VITE_',
		'PUBLIC_',
		'VERCEL_',
	],

	server: {
		host: env.HOST,
	},
});
