import { resolve } from 'node:path';
import { definePlugin } from '@ovenwand/toolchain.core';
import { readTurboJson } from './utils/read-turbo-json.js';
import { DEFAULT_TURBO_JSON } from './utils/default-turbo-json.js';
import { ensureTurboJson } from './utils/ensure-turbo-json.js';
import { createTurboCommand } from './commands/turbo.js';

export const name = 'turbo';

export default definePlugin((context) => {
	const turboJsonFile = resolve(context.meta.workspace.path, 'turbo.json');

	return {
		async configure(config) {
			await ensureTurboJson(turboJsonFile, DEFAULT_TURBO_JSON);

			config.turbo = {
				enabled: true,
				config: await readTurboJson(turboJsonFile),
			};

			return config;
		},

		async resolve({ cli, config }) {
			if (!config.turbo.enabled) {
				return;
			}

			cli.commands.add(
				createTurboCommand(context),
				{ isDefault: true }
			);
		},
	};
});
