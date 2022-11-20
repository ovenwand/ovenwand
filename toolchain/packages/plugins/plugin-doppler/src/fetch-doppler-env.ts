import { exec } from '@ovenwand/toolchain.cli';

export async function fetchDopplerEnv(project: string, context) {
	const { doppler } = context.config;

	const result = await exec('doppler', [
		'--configuration', doppler.configFile,
		'--json',
		'secrets',
		'--project', project,
		'--config', doppler.scope.config,
	], { stdio: 'pipe' });

	if (!result.ok) {
		return JSON.stringify({});
	}

	const env = JSON.parse(result.output);

	for (const key of Object.keys(env)) {
		env[key] = env[key].computed;
	}

	return JSON.stringify(env);
}
