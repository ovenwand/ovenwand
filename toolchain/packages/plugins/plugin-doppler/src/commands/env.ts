import { dirname } from 'node:path';
import { Command, exec, exit } from '@ovenwand/toolchain.cli';
import { createInstallCommand } from './install.js';

export function createEnvCommand(context) {
	const { config, env } = context;
	const { cwd } = context.meta;
	const dopplerConfig = config.doppler;
	const envCommand = new Command('env');

	envCommand.addCommand(createInstallCommand(context));

	envCommand.allowUnknownOption().helpOption(false).argument('[action]', 'Doppler action');

	envCommand.action(async (action, options, command) => {
		const args = [...command.args];
		const dopplerArgs = [];

		const isSecretsCommand = args.includes('secrets');
		const isRunCommand = args.includes('run');
		const isEnvironmentsCommand = args.includes('environments');

		const includeConfigArgs = isRunCommand || isSecretsCommand || isEnvironmentsCommand;

		if (dopplerConfig.configFile) {
			dopplerArgs.unshift('--config-dir', dirname(dopplerConfig.configFile));
		}

		if (dopplerConfig.scope.project && includeConfigArgs) {
			args.push('--project', dopplerConfig.scope.project);
		}

		if (dopplerConfig.scope.config && includeConfigArgs) {
			args.push('--config', dopplerConfig.scope.config);
		}

		if (isSecretsCommand && env.CI) {
			args.push('--only-names');
		}

		if (isRunCommand) {
			args.push('--');
		}

		const result = await exec('doppler', [...dopplerArgs, ...args], { cwd, env });

		exit(result.code);
	});

	return envCommand;
}
