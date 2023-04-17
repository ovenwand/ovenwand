import { resolve } from 'node:path';
import { pathExists } from './path-exists.js';

export async function findPackageJson(path, root = '/'): Promise<string | null> {
	if (path === root) {
		return null;
	}

	const packageJsonPath = resolve(path, 'package.json');

	if (!(await pathExists(packageJsonPath))) {
		return findPackageJson(resolve(path, '..'), root);
	}

	return packageJsonPath;
}
