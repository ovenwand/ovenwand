import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	plugins: [
		// The @vitejs/plugin-vue included here seems to be ignored by apps/vite, which fail to build SFC files
		vue({
			include: /^(.*)\.vue$/,
			reactivityTransform: /^(.*)\.vue$/,
		}),
	],
});
