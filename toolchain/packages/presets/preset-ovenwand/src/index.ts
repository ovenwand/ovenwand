import { definePreset } from '@ovenwand/toolchain.core';

export const name = 'ovenwand';

export default definePreset(() => ({
	environment(env, { meta }) {
		env.VERSION ??= meta.package?.manifest.version;

		if (env.NODE_ENV === 'development') {
			env.DOMAIN ??= 'ovenwand.wtf';

			const packageName = meta.package?.manifest.name.split('/')[1];
			const subdomain = packageName.replace(/\.ovenwand\.com$/, '').replace(/\.docs$/, ''); // TODO remove domains from package names

			env.HOST ??= packageName === 'ovenwand.com' ? env.DOMAIN : `${subdomain}.${env.DOMAIN}`;
			env.DOCS_HOST ??=
				packageName === 'docs.ovenwand.com'
					? `docs.${env.DOMAIN}`
					: `${subdomain}.docs.${env.DOMAIN}`;
		}

		return env;
	},
	async configure(config) {
		if (config.vite) {
			const { default: viteConfig } = await import('./vite.config.js');
			config.vite.configs.push(viteConfig);
		}
		return config;
	}
}));
