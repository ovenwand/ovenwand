import { resolve } from 'path';
import { exec } from './exec.js';

export async function doppler(args, options, execOptions) {
	const { env, paths, project } = options;

	const command = args[0];

	if (command !== 'run' && !project) {
		throw new Error(`Doppler: project is required, found '${project}'.`);
	}

	const params = {
		config: resolve(paths.kit, 'config', '.doppler.yaml'),
		scope: resolve(paths.workspace, 'apps', project),
		project: command !== 'run' ? project.replace(/\./g, '-') : undefined,
		env: command !== 'run' ? env : undefined
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
