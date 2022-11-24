import { Command, exec, exit } from '@ovenwand/toolchain.cli';

export function createRunCommand(context) {
	const { env } = context;
	const { cwd, packageManager } = context.meta;

	const command = new Command('run');

	command
		.allowUnknownOption()
		.helpOption(false)
		.argument('[script]', 'script to run');

	command.action(async (script, options, command) => {
		const result = await exec(packageManager.bin, command.args, { cwd, env });
		exit(result.code);
	});

	return command;
}
