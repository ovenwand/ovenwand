import { definePreset } from '@ovenwand/toolchain.core';

export const name = 'react';

export default definePreset({
	async configure(config) {
		if (config.vite?.enabled) {
			const { default: viteConfig } = await import('./vite.config.js');
			config.vite.configs.push(viteConfig);
		}
		return config;
	}
});
