export async function resolveConfig({ configs }) {
	const { mergeConfig } = await import('vite');

	return configs.reduce((mergedConfig, viteConfig) => {
		if (viteConfig) {
			return mergeConfig(mergedConfig, viteConfig);
		}

		return mergedConfig;
	}, {});
}
