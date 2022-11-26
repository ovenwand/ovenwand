import { fileURLToPath } from 'node:url';
import { Command, exit, exec } from '@ovenwand/toolchain.cli';

export function createElectronCommand(context) {
	const { cwd, env } = context;
  const command = new Command('electron');

	command.action(async (options, command) => {
		const args = [fileURLToPath(new URL('./entry.cjs', import.meta.url))];
		const result = await exec('electron', args, { cwd, env });
		exit(result.code);
	});

	return command;
}
