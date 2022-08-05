import { exec } from './exec.js';

export async function turbo(args, options, execOptions) {
	const { paths } = options;

	return exec('turbo', getCommandArgs(options, args), {
		// Make sure turbo commands are always executed from the workspace root
		// (unless overwritten by `execOptions`), since it requires the presence
		// of a `turbo.json` in the cwd.
		cwd: paths.workspace,
		...execOptions
	});
}

function getCommandArgs({ filter, force }, commandArgs) {
	const args = [];

	args.push(...commandArgs);

	if (filter) {
		args.push('--filter', filter);
	}

	if (force) {
		args.push('--force');
	}

	return args;
}
