import { fileURLToPath } from 'node:url';
import { Command, exit, exec } from '@ovenwand/toolchain.cli';

export function createElectronCommand(context) {
	const { env } = context;
	const { cwd } = context.meta;
	const command = new Command('electron');

	command.action(async () => {
		const args = [fileURLToPath(new URL('./entry.cjs', import.meta.url))];
		const result = await exec('electron', args, { cwd, env });
		exit(result.code);
	});

	return command;
}
