import { resolve } from 'node:path';
import { Command, exec, exit } from '@ovenwand/toolchain.cli';
import { getBranchName } from '../utils/get-branch-name.js';
import { getCommitMessage } from '../utils/get-commit-message.js';

export function createTurboIgnoreCommand(context) {
	const { env } = context;
	const { cwd, packageManager } = context.meta;

	const command = new Command('ignore');

	command.argument('[path]', 'Path to package to run turbo-ignore against', cwd);

	command.action(async (path) => {
		const branchName = await getBranchName();
		const commitMessage = await getCommitMessage();
		const args = ['--silent', 'dlx', 'turbo-ignore'];
		const cwd = resolve(path);

		const isMainBranch = env.TOOLCHAIN_RELEASE_BRANCH
			? branchName === env.TOOLCHAIN_RELEASE_BRANCH
			: false;

		const isReleaseCommit = env.TOOLCHAIN_RELEASE_COMMIT
			? commitMessage === env.TOOLCHAIN_RELEASE_COMMIT
			: true;

		if (env.TURBO_FORCE === 'true' || !isMainBranch || isReleaseCommit) {
			const result = await exec(packageManager.bin, args, { cwd, env });
			exit(result.code);
		}
	});

	return command;
}
