import { resolve } from 'path';
import { createCommand, exec } from '../utils/index.js';

export const install = createCommand(async (options, command, { paths }) => {
	const scriptsDir = resolve(paths.kit, 'scripts');
	await exec('mkdir', ['-p', scriptsDir]);

	const hooksDir = resolve(paths.kit, 'hooks');
	await exec('mkdir', ['-p', hooksDir]);
	await exec('git', ['config', 'core.hooksPath', hooksDir]);
});
