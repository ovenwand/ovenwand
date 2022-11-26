import { fileURLToPath } from 'node:url';
import { definePlugin } from '@ovenwand/toolchain.core';
import { createElectronCommand } from './commands';
import { electron } from './vite-plugin-electron.js';

export const name = 'electron';

export const enforce = 'post';

export default definePlugin((context) => {
	return {
		async configure(config) {
			const mainElectronEntry = fileURLToPath(new URL('./runtime/main.cjs', import.meta.url));

			config.electron = { enabled: true };

			if (config.vite && config.electron.enabled) {
				config.vite.configs.push({
					plugins: [
						electron({
							entry: mainElectronEntry,
							env: context.env,
						}),
					],
				});
			}

			return config;
		},

		async resolve({ cli }) {
			cli.commands.add(
				createElectronCommand(context)
			);
		}
	};
});
