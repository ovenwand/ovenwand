import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

export async function dev(app, options) {
	const turbo = fileURLToPath(await import.meta.resolve('turbo/bin/turbo'));

	const command = options.env ? 'dev:env' : 'dev';
	const filterArg = app ? ['--filter', `@ovenwand/${app}`] : [];
	const forceArg = options.force ? ['--force'] : [];
	const args = ['run', command, ...filterArg, ...forceArg];

	spawn(turbo, args, { stdio: 'inherit' });
}
