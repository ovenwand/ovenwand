import { createCommand, exec } from '../utils/index.js';

export const release = createCommand(async (action) => {
	if (action === 'tag') {
		await exec('changeset', ['tag']);
	}
});
