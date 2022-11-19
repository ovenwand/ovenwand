import { cwd } from 'node:process';
import { dirname, resolve } from 'node:path';
import { findPackageJson, readPackageJson, findWorkspace } from '../../utils/index.js';

export async function createMeta(context: Toolchain.Context): Promise<Toolchain.Meta> {
	const workspacePath = await findWorkspace();
	const workspacePackagePath = resolve(workspacePath, 'package.json');

	context.cwd ??= cwd();

	const localPackagePath = await findPackageJson(context.cwd, workspacePath);

	return {
		cwd: context.cwd,

		workspace: workspacePath && {
			path: workspacePath,
			...await readPackageJson(workspacePackagePath),
		},

		package: localPackagePath && {
			path: dirname(localPackagePath),
			...await readPackageJson(localPackagePath),
		},
	};
}
