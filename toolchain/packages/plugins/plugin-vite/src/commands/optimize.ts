import { Command, exec, exit } from '@ovenwand/toolchain.cli';

export function createOptimizeCommand({ config, meta, env }: Toolchain.Context) {
	const command = new Command('optimize');

	command.action(async (options, command) => {
		// const args = [...command.args];
		//
		// if (config.vite.config) {
		// 	args.unshift('--config', config.vite.config);
		// }
		//
		// const result = await exec('vite', ['optimize', ...args], { cwd: meta.cwd, env });
		// exit(result.code);
	});

	return command;
}
