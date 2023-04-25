import { exit } from 'node:process';
import { definePlugin } from '@ovenwand/toolchain.core';
import { exec } from '@ovenwand/toolchain.cli';

export const name = 'storybook';

export default definePlugin(() => {
	return {
		async configure(config) {
			config.storybook = { enabled: true };
			return config;
		},

		async resolve({ cli, config, env, meta }) {
			if (!config.storybook.enabled) {
				return;
			}

			cli.program
				.command('docs')
				.alias('storybook')
				.allowUnknownOption()
				.helpOption(false)
				.argument('[command]')
				.action(async (arg, options, command) => {
					const isDevArg = arg === 'dev';
					const hasHostParam = command.args.includes('-h') || command.args.includes('--host');

					const hostArgs = !env.DOCS_HOST ? [] : ['-h', env.DOCS_HOST];

					const devArgs = ['--no-open', ...(!hasHostParam ? hostArgs : [])];

					const args = [arg, ...(isDevArg ? devArgs : []), ...command.args.slice(1)].filter(
						Boolean
					);

					const result = await exec('storybook', args, { cwd: meta.cwd, env });
					exit(result.code);
				});
		}
	};
});
