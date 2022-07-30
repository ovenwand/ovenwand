import { resolve } from 'path';
import { exec } from './exec.js';

export async function doppler(args, options, execOptions) {
	const { env, paths, project } = options;

	const params = {
		config: resolve(paths.kit, 'config', '.doppler.yaml'),
		scope: resolve(paths.workspace, 'apps', project),
		project: project.replace(/\./g, '-'),
		env
	};

	const result = await exec(
		'doppler',
		[...getDopplerArgs(params), ...args, ...getCommandArgs(params)],
		execOptions
	);

	if (!result.ok) {
		const { error } = JSON.parse(result.output);
		throw new Error(error);
	}

	try {
		result.data = JSON.parse(result.output);
	} catch (e) {
		// Fail silently when the output is not json
	}

	return result;
}

export function getDopplerArgs({ config, scope }) {
	const args = ['--json'];

	if (config) {
		args.push('--configuration', config);
	}

	if (scope) {
		args.push('--scope', scope);
	}

	return args;
}

export function getCommandArgs({ project, env }) {
	const args = [];

	if (project) {
		args.push('--project', project);
	}

	if (env) {
		args.push('--config', env);
	}

	return args;
}
