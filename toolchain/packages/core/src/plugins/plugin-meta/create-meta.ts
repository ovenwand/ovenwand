import { cwd as _cwd } from 'node:process';
import { dirname, resolve } from 'node:path';
import {
	findPackageJson,
	readPackageJson,
	findWorkspace,
	detectPackageManager
} from '../../utils/index.js';

export async function createMeta(context: Toolchain.Context): Promise<Toolchain.Meta> {
	const cwd = _cwd();
	const workspacePath = await findWorkspace(cwd);
	const workspacePackagePath = resolve(workspacePath, 'package.json');
	const localPackagePath = await findPackageJson(cwd, workspacePath);

	return {
		cwd,

		packageManager: await detectPackageManager(),

		workspace: workspacePath && {
			path: workspacePath,
			...(await readPackageJson(workspacePackagePath))
		},

		package: localPackagePath && {
			path: dirname(localPackagePath),
			...(await readPackageJson(localPackagePath))
		}
	};
}
