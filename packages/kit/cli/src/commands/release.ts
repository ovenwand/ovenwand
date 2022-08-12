import { createCommand, exec } from '../utils';

export const release = createCommand(async (action) => {
	if (action === 'tag') {
		await exec('changeset', ['tag']);
	}
});
