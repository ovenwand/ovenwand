import { fileURLToPath } from 'node:url';
import { Command } from '@ovenwand/toolchain.cli';

function cleanProcessArgv(argv, { args }) {
	const start = 2;
	const deleteCount = argv.slice(start).length - args.length;
	argv.splice(start, deleteCount);
}

async function getConfigPath() {
	return fileURLToPath(await import.meta.resolve('../plopfile.ts'));
}

export function createScaffoldCommand(context) {
	const command = new Command('scaffold');

	command
		.allowUnknownOption()
		.helpOption(false)

	command.action(async (options, command) => {
		cleanProcessArgv(context.cli.argv, command);

		const { Plop, run } = await import('plop');

		Plop.prepare(
			{
				configPath: await getConfigPath(),
			},
			(env) =>
				Plop.execute(env, (env) => {
					return run(env, undefined, true);
				})
		);
	});

	return command;
}
