import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from '../../cli/src/utils/exec.js';

export async function eslint(params, execOptions = {}) {
	const { options, paths, eslintConfig, eslintIgnore } = params;
	const args = [...params.args];

	const eslintApi = fileURLToPath(await import.meta.resolve('eslint'));
	const eslint = relative(paths.workspace, resolve(dirname(eslintApi), '../bin/eslint.js'));

	if (options.format) {
		args.unshift('--fix');
	}

	args.unshift('--ignore-path', eslintIgnore);
	args.unshift('--config', eslintConfig);

	return exec(eslint, args, {
		cwd: paths.workspace,
		...execOptions
	});
}

export async function prettier(params, execOptions = {}) {
	const { options, paths, prettierConfig, prettierIgnore } = params;
	const args = [...params.args];

	const prettier = fileURLToPath(await import.meta.resolve('prettier/bin-prettier.js'));

	if (options.format) {
		args.unshift('--write');
	}

	args.unshift('--ignore-path', prettierIgnore);
	args.unshift('--config', prettierConfig);

	return exec(prettier, args, {
		cwd: paths.workspace,
		...execOptions
	});
}
