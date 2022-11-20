import { resolve } from 'node:path';
import { findWorkspace } from './find-workspace.js';
import { pathExists } from './path-exists.js';

const	NPM: 'npm' = 'npm';
const YARN: 'yarn' = 'yarn';
const PNPM: 'pnpm' = 'pnpm';

const LOCK_FILE = {
	[NPM]: 'package-lock.json',
	[YARN]: 'yarn.lock',
	[PNPM]: 'pnpm-lock.yaml',
};

export interface ToolchainPackageManager {
	name: string;
	bin: string;
}

export async function detectPackageManager(): Promise<ToolchainPackageManager> {
	const workspace = await findWorkspace();
	const packageManager: Partial<ToolchainPackageManager> = {};

	const [isNpm, isYarn, isPnpm] = await Promise.all([
		await pathExists(resolve(workspace, LOCK_FILE[NPM])),
		await pathExists(resolve(workspace, LOCK_FILE[YARN])),
		await pathExists(resolve(workspace, LOCK_FILE[PNPM])),
	]);

	if (isNpm) {
		packageManager.name = NPM;
		packageManager.bin = NPM;
	}

	if (isYarn) {
		packageManager.name = YARN;
		packageManager.bin = YARN;
	}

	if (isPnpm) {
		packageManager.name = PNPM;
		packageManager.bin = PNPM;
	}

	return packageManager as ToolchainPackageManager;
}