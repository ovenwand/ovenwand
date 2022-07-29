import { createCommand, exec } from '../utils/index.js';

export const commit = createCommand(async (options) => {
	if (options.prepare) {
		await exec('changeset', []);
		await exec('git', ['add', './.changeset']);
		await exec('lint-staged');
	}

	if (options.lint) {
		await exec('commitlint', ['--edit', options.lint]);
	}
});
