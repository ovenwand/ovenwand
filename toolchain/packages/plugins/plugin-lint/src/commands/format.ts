import { fileURLToPath } from 'node:url';
import { Command, exec, exit } from '@ovenwand/toolchain.cli';
import { getEslintArgs, getPrettierArgs } from '../utils.js';

export function createFormatCommand(context) {
	const { env } = context;
	const { cwd } = context.meta;
	const { eslint: eslintConfig, prettier: prettierConfig } = context.config.lint;
	const command = new Command('format');

	command.option('--disable-prettier', 'Disable prettier');
	command.option('--disable-eslint', 'Disable eslint');

	command.action(async (options, command) => {
		const pluginPath = fileURLToPath(new URL('../..', import.meta.url));
		const promises = [];

		if (!options.disableEslint && eslintConfig.enabled) {
			const eslintArgs = getEslintArgs(eslintConfig, command);
			promises.push(exec('eslint', [...eslintArgs, '--fix'], { stdio: 'inherit', cwd, env }));
		}

		if (!options.disablePrettier && prettierConfig.enabled) {
			const prettierArgs = getPrettierArgs(prettierConfig, command);
			promises.push(
				exec('prettier', [...prettierArgs, `--plugin-search-dir=${pluginPath}`, '--write'], {
					stdio: 'inherit',
					cwd,
					env
				})
			);
		}

		const results = await Promise.all(promises);

		for (const result of results) {
			if (result.code !== 0) {
				return exit(result.code);
			}
		}

		return exit(0);
	});

	return command;
}
