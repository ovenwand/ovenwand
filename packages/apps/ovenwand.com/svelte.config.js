import config from '@ovenwand/config/svelte';

config.kit.vite.server = {
	https: true
};

config.kit.vite.optimizeDeps = {
	include: ['axios']
};

export default config;
