import { fileURLToPath } from 'node:url';
import { exec } from './exec';

export async function commitlint(params, execOptions = {}) {
	const { paths, commitlintConfig } = params;
	const args = [...params.args];
	const message = args.shift();

	const commitlint = 'commitlint' || fileURLToPath(await import.meta.resolve('@commitlint/cli'));

	args.unshift('--config', commitlintConfig);
	args.unshift('--edit', message);

	return exec(commitlint, args, {
		cwd: paths.workspace,
		...execOptions
	});
}
