/// <reference path="../../plugin-cli/src/ambient.d.ts" />

import { definePlugin, PRIORITY } from '@ovenwand/toolchain.core';
import { createRunCommand } from './commands/run.js';
import { createCli } from './create-cli.js';

export const name = 'cli';

export const priority = PRIORITY.SYSTEM;

export default definePlugin((context) => {
	context.cli = createCli();

	context.hooks.create('run', { priority: 100 });

	return {
		async configure(config) {
			config.cli = { enabled: true };
			return config;
		},

		async resolve({ cli, config }) {
			if (!config.cli.enabled) {
				return;
			}

			cli.commands.add(
				createRunCommand(context),
				{ isDefault: true }
			);
		},

		async run({ cli, config }) {
			if (!config.cli.enabled) {
				return;
			}

			cli.program.version(cli.version);
			cli.program.parse(cli.argv);
		}
	};
});
