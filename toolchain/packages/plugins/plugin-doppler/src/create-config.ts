export function createConfig({ env, meta }) {
	const { name: packageName } = meta.package
		? meta.package.manifest
		: meta.workspace.manifest;

	return {
		enabled: !['false', '0'].includes(env.OVEN_DOPPLER_ENV),
		configFile: env.OVEN_DOPPLER_CONFIG,
		scope: {
			project: packageName.split('/')[1].replace(/\./g, '-'),
			config: env.NODE_ENV ?? 'development',
		},
	};
}
