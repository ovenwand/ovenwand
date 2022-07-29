import { exec } from '../utils.js';

export async function preview(app, options) {
	const command = options.env ? 'preview:env' : 'preview';
	const filterArg = app ? ['--filter', `@ovenwand/${app}`] : [];
	const forceArg = options.force ? ['--force'] : [];
	await exec('turbo', ['run', command, ...filterArg, ...forceArg]);
}
