import { createCommand } from '../utils/index.js';

export const dev = createCommand(async (app, options) => {
	const command = options.env ? 'dev:env' : 'dev';
	const filterArg = app ? ['--filter', `@ovenwand/${app}`] : [];
	const forceArg = options.force ? ['--force'] : [];
	await exec('turbo', ['run', command, ...filterArg, ...forceArg], { stdio: 'inherit' });
});
