import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { definePlugin } from '@ovenwand/toolchain.core';
import { createLintCommand } from './commands/lint.js';
import { createFormatCommand } from './commands/format.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const name = 'lint';

export default definePlugin((context) => {
	const eslintConfig = resolve(__dirname, 'config/.eslintrc.cjs');
	const eslintIgnore = resolve(__dirname, 'config/.eslintignore');
	const prettierConfig = resolve(__dirname, 'config/.prettierrc');
	const prettierIgnore = resolve(__dirname, 'config/.prettierignore');

	return {
		async configure(config, { env }) {
			config.lint = {
				enabled: !['false', '0'].includes(env.TOOLCHAIN_LINT),

				eslint: {
					enabled: !['false', '0'].includes(env.TOOLCHAIN_LINT_ESLINT),
					config: eslintConfig,
					pattern: '.',
					ignorePath: eslintIgnore
				},

				prettier: {
					enabled: !['false', '0'].includes(env.TOOLCHAIN_LINT_PRETTIER),
					config: prettierConfig,
					pattern: '.',
					ignorePath: prettierIgnore
				}
			};
			return config;
		},

		async resolve({ cli, config }) {
			if (!config.lint.enabled) {
				return;
			}

			cli.commands.add(createLintCommand(context));

			cli.commands.add(createFormatCommand(context));
		}
	};
});
