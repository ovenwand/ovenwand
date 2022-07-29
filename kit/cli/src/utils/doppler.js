import { resolve } from 'path';
import { exec } from './exec.js';

export async function doppler(args, options, execOptions) {
	const { env, paths, project } = options;

	const params = {
		config: resolve(paths.kit, 'config', '.doppler.yaml'),
		scope: project && resolve(paths.workspace, 'apps', project),
		project,
		env
	};

	return await exec(
		'doppler',
		[...getDopplerArgs(params), ...args, ...getCommandArgs(params)],
		execOptions
	);
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
		args.push('--project', project.replace(/\./g, '-'));
	}

	if (env) {
		args.push('--config', env);
	}

	return args;
}
