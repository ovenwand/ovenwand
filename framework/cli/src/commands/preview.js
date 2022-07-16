import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

export async function preview(app, options) {
	const turbo = fileURLToPath(await import.meta.resolve('turbo/bin/turbo'));

	const command = options.env ? 'preview:env' : 'preview';
	const filterArg = app ? ['--filter', `@ovenwand/${app}`] : [];
	const forceArg = options.force ? ['--force'] : [];
	const args = ['run', command, ...filterArg, ...forceArg];

	spawn(turbo, args, { stdio: 'inherit' });
}