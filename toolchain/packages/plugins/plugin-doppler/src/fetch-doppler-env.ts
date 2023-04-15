import { dirname } from 'node:path';
import { exec } from '@ovenwand/toolchain.cli';

export async function fetchDopplerEnv(project: string, context) {
	const { doppler } = context.config;

	const args = [
		'--no-check-version',
		'--json',
		'secrets',
		'--project',
		project,
		'--config',
		doppler.scope.config
	];

	if (doppler.configFile) {
		args.unshift('--config-dir', dirname(doppler.configFile));
	}

	const result = await exec('doppler', args, { stdio: 'pipe' });

	if (!result.ok) {
		const lines = result.output.split('\n').filter(Boolean);
		const { error } = JSON.parse(lines.pop());

		if (lines.length) {
			console.info(lines.join('\n'));
		}

		if (error) {
			console.warn(`Warning: Failed to fetch doppler env with error: "${error}"`);
		}

		return JSON.stringify({});
	}

	const env = JSON.parse(result.output);

	for (const key of Object.keys(env)) {
		env[key] = env[key].computed;
	}

	return JSON.stringify(env);
}
