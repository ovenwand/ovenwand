import { definePreset } from '@ovenwand/toolchain.core';

export const name = 'preset:ovenwand';

export default definePreset(() => ({
	environment(env) {
		env.VERSION ??= env.npm_package_version;
		env.DOMAIN ??= `ovenwand.${env.NODE_ENV === 'production' ? 'com' : 'wtf'}`;

		const [_namespace, packageName] = env.npm_package_name.split('/');
		const subdomain = packageName.replace(/\.ovenwand\.com$/, '').replace(/\.docs$/, ''); // TODO remove domains from package names

		env.HOST ??= packageName === 'ovenwand.com' ? env.DOMAIN : `${subdomain}.${env.DOMAIN}`;
		env.DOCS_HOST ??= packageName === 'docs.ovenwand.com' ? `docs.${env.DOMAIN}` : `${subdomain}.docs.${env.DOMAIN}`;

		return env;
	},
	async configure(config) {
		if (config.vite) {
			const { default: viteConfig } = await import('./vite.config.js');
			config.vite.configs.push(viteConfig);
		}
		return config;
	},
}));
