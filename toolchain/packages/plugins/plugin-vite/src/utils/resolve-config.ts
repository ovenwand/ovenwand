import { mergeConfig } from 'vite';

export function resolveConfig({ configs }) {
	return configs.reduce((mergedConfig, viteConfig) => {
		if (viteConfig) {
			return mergeConfig(mergedConfig, viteConfig);
		}

		return mergedConfig;
	}, {});
}