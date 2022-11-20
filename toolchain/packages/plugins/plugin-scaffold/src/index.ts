import { definePlugin } from '@ovenwand/toolchain.core';
import { createScaffoldCommand } from './commands/scaffold.js';

export const name = 'scaffold';

export default definePlugin((context) => {
	return {
		async configure(config) {
			config.scaffold = { enabled: true };
			return config;
		},

		async resolve({ cli, config }) {
			if (!config.scaffold.enabled) {
				return;
			}

			cli.commands.add(
				createScaffoldCommand(context)
			);
		},
	};
});
