import { resolve } from 'path';
import { createCommand, exec } from '../utils/index.js';

export const commit = createCommand(async (action, _options, { paths }) => {
	switch (action) {
		case 'prepare': {
			await exec('changeset', []);
			await exec('git', ['add', resolve(paths.workspace, '.changeset')]);
			break;
		}
		case 'lint': {
			await exec('lint-staged');
			break;
		}
	}
});
