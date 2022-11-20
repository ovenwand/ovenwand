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

		async resolve({ cli, config, cwd, env }) {
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

					const devArgs = ['--no-open'];
					const hostArgs = !env.DOCS_HOST ? [] : ['-h', env.DOCS_HOST];

					const args = [
						arg,
						...(isDevArg ? devArgs : []),
						...(!hasHostParam ? hostArgs : []),
						...command.args.slice(1)
					].filter(Boolean);

					const result = await exec('storybook', args, { cwd, env });
					exit(result.code);
				});
		},
	};
});
