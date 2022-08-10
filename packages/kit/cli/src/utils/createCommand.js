import { relative, resolve } from 'path';
import findWorkspaceDir from '@pnpm/find-workspace-dir';

export async function createCommand(command) {
	const workspace = await findWorkspaceDir.default(process.cwd());

	const paths = {
		cwd: resolve(),
		workspace,
		kit: resolve(workspace, '.kit'),
		apps: resolve(workspace, 'apps'),
		packages: resolve(workspace, 'packages')
	};

	const context = { paths, project: undefined };

	const currentDir = relative(paths.apps, paths.cwd);
	const isAppDir = !!currentDir && !currentDir.startsWith('..');

	if (isAppDir) {
		context.project = currentDir.split('/')[0];
	}

	return (...args) => {
		context.command = args.pop();
		let options = args.pop();

		if (context.command.parent) {
			// TODO don't depend on _optionValues
			options = { ...context.command.parent._optionValues, ...options };
		}

		if (options.project) {
			context.project = options.project;
		}

		if (!options.project && context.project) {
			options.project = context.project;
		}

		return command(...args, options, context);
	};
}
