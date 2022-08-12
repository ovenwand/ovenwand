import { resolve } from 'node:path';
import { createCommand, exec } from '../utils';

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
