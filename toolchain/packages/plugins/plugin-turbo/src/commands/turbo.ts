import { Command, exec, exit } from '@ovenwand/toolchain.cli';
import { createTurboIgnoreCommand } from './ignore.js';

export function getTurboArgs(action, options, command, context) {
	const { config, env, meta } = context;
	const args = [...command.args];

	const useAutoAction = action == null || action.startsWith('-');

	const runActions = Object.keys(config.turbo.config.pipeline);

	if (useAutoAction || runActions.includes(action)) {
		const autoArgs = ['run'];

		if (useAutoAction) {
			if (env.CI) {
				autoArgs.push(env.NODE_ENV === 'development' ? 'preview' : 'build');
			} else {
				autoArgs.push('dev');
			}
		}

		args.unshift(...autoArgs);
	}

	if (meta.package) {
		args.push('--filter', meta.package.manifest.name);
	}

	return args;
}

export function createTurboCommand(context) {
	const { env, meta } = context;

	const command = new Command('turbo');

	command.addCommand(createTurboIgnoreCommand(context));

	command.allowUnknownOption().helpOption(false).argument('[action]', 'Turbo command');

	command.action(async (action, options, command) => {
		const args = getTurboArgs(action, options, command, context);
		const cwd = meta.package ? meta.workspace.path : context.cwd;
		const result = await exec('turbo', args, { cwd, env });
		exit(result.code);
	});

	return command;
}
