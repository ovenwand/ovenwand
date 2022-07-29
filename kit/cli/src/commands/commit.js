import { resolve } from 'path';
import { createCommand, exec } from '../utils/index.js';

export const commit = createCommand(async (options, command, { paths }) => {
	if (options.prepare) {
		await exec('changeset', []);
		await exec('git', ['add', resolve(paths.workspace, '.changeset')]);
		await exec('lint-staged');
	}

	if (options.lint) {
		await exec('commitlint', ['--edit', options.lint]);
	}
});
