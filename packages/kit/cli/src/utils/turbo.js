import { exec } from './exec.js';

export async function turbo(args, options, execOptions) {
	const { paths } = options;

	const command = args.shift();
	const arg = args.shift();

	return exec(
		'turbo',
		[command, arg, ...getTurboArgs(options), '--', ...getCommandArgs(options, args)],
		{
			// Make sure turbo commands are always executed from the workspace root
			// (unless overwritten by `execOptions`), since it requires the presence
			// of a `turbo.json` in the cwd.
			cwd: paths.workspace,
			...execOptions
		}
	);
}

function getTurboArgs({ filter, force }) {
	const args = [];

	if (filter) {
		args.push('--filter', filter);
	}

	if (force) {
		args.push('--force');
	}

	return args;
}

function getCommandArgs({ filter, force }, commandArgs) {
	const args = [];

	args.push(...commandArgs);

	return args;
}
