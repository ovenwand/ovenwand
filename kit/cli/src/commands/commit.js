import { createCommand, exec } from '../utils/index.js';

export const commit = createCommand(async () => {
	await exec('changeset', []);
	await exec('git', ['add', './.changeset']);
});
