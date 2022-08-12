import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Command } from 'commander';
import { plop } from '@ovenwand/kit.scaffold';
import { createCommand, exec, fileExists } from '../utils';

export async function scaffold() {
	const program = new Command('scaffold')
		.option('-u, --update-plopfile', 'Updates the plopfile in .kit with the default plopfile')
		.action(await createScaffold());

	return program;
}

const createScaffold = () =>
	createCommand(async (...commandArgs) => {
		const context = commandArgs.pop();
		const options = commandArgs.pop();

		const { args } = context.command;
		const { paths } = context;

		const params = {
			config: resolve(paths.kit, 'config', 'plopfile.js'),
			args,
			options,
			paths
		};

		const plopfile = fileURLToPath(await import.meta.resolve('@ovenwand/kit.scaffold/plopfile.js'));

		if (options.updatePlopfile || !(await fileExists(plopfile))) {
			await exec('cp', [plopfile, params.config]);
		}

		await plop(params);
	});
