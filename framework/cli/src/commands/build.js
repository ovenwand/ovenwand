import { exec } from '../utils.js';

export async function build(app, options) {
	const command = options.env ? 'build:env' : 'build';
	const filterArg = app ? ['--filter', `@ovenwand/${app}`] : [];
	const forceArg = options.force ? ['--force'] : [];
	await exec('turbo', ['run', command, ...filterArg, ...forceArg]);
}
