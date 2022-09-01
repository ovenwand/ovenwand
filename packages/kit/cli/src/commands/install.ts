import { resolve } from 'node:path';
import { createCommand, exec } from '../utils';

export const install = createCommand(async (_options, { paths }) => {
	const configDir = resolve(paths.kit, 'config');
	await exec('mkdir', ['-p', configDir]);

	const scriptsDir = resolve(paths.kit, 'scripts');
	await exec('mkdir', ['-p', scriptsDir]);

	const hooksDir = resolve(paths.kit, 'hooks');
	await exec('mkdir', ['-p', hooksDir]);
	await exec('git', ['config', 'core.hooksPath', hooksDir]);

	const testDir = resolve(paths.kit, 'test');
	await exec('mkdir', ['-p', testDir]);
});
