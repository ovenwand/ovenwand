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
	lockFile: string;
}

export async function detectPackageManager(): Promise<ToolchainPackageManager> {
	const workspace = await findWorkspace();

	const npm: ToolchainPackageManager = {
		name: NPM,
		bin: NPM,
		lockFile: resolve(workspace, LOCK_FILE[NPM]),
	};

	const yarn: ToolchainPackageManager = {
		name: YARN,
		bin: YARN,
		lockFile: resolve(workspace, LOCK_FILE[YARN]),
	};

	const pnpm: ToolchainPackageManager = {
		name: PNPM,
		bin: PNPM,
		lockFile: resolve(workspace, LOCK_FILE[PNPM]),
	};

	const [isNpm, isYarn, isPnpm] = await Promise.all([
		await pathExists(npm.lockFile),
		await pathExists(yarn.lockFile),
		await pathExists(pnpm.lockFile),
	]);

	if (isNpm) {
		return npm;
	}

	if (isYarn) {
		return yarn;
	}

	if (isPnpm) {
		return pnpm;
	}
}
