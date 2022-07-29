import { createCommand, exec } from '../utils/index.js';

export const preview = createCommand(async (app, options) => {
	const command = options.env ? 'preview:env' : 'preview';
	const filterArg = app ? ['--filter', `@ovenwand/${app}`] : [];
	const forceArg = options.force ? ['--force'] : [];
	await exec('turbo', ['run', command, ...filterArg, ...forceArg]);
});
