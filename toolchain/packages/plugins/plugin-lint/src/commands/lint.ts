import { Command, exec, exit } from '@ovenwand/toolchain.cli';
import { getEslintArgs, getPrettierArgs } from '../utils.js';

export function createLintCommand(context) {
	const { cwd, env } = context;
	const { eslint: eslintConfig, prettier: prettierConfig } = context.config.lint;
	const command = new Command('lint');

	command.option('--disable-prettier', 'Disable prettier');
	command.option('--disable-eslint', 'Disable eslint');

	command.action(async (options, command) => {
		const promises = [];

		if (!options.disableEslint && eslintConfig.enabled) {
			const eslintArgs = getEslintArgs(eslintConfig, command);
			promises.push(exec('eslint', [...eslintArgs], { stdio: 'inherit', cwd, env }));
		}

		if (!options.disablePrettier && prettierConfig.enabled) {
			const prettierArgs = getPrettierArgs(prettierConfig, command);
			promises.push(exec('prettier', [...prettierArgs, '--check'], { stdio: 'inherit', cwd, env }));
		}

		const results = await Promise.all(promises);

		for (const result of results) {
			if (result.code !== 0) {
				return exit(result.code);
			}
		}

		exit(0);
	});

	return command;
}
