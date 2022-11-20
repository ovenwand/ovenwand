import { resolve } from 'node:path';
import { exec } from './exec.js';

export async function doppler(args, options, execOptions?) {
	const { env, paths, project } = options;

	const command = args[0];

	const requiresProject = ['get', 'set', 'run'].includes(command);

	if (requiresProject && !project) {
		throw new Error(`Doppler: project is required, found '${project}'.`);
	}

	const params = {
		config: resolve(paths.kit, 'config', '.doppler.yaml'),
		scope: project ? resolve(paths.workspace, 'apps', project) : undefined,
		project: requiresProject ? project.replace(/\./g, '-') : undefined,
		env: requiresProject ? env : undefined
	};

	const result = await exec(
		'doppler',
		[...getDopplerArgs(params), ...getCommandArgs(params, args)],
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

export function getCommandArgs({ project, env }, commandArgs) {
	const args = [];

	if (project) {
		args.push('--project', project);
	}

	if (env) {
		args.push('--config', env);
	}

	args.push(...commandArgs);

	return args;
}
