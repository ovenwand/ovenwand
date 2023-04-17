import { Command } from '@ovenwand/toolchain.cli';
import { resolveConfig } from '../utils/resolve-config.js';

export function createBuildCommand({ config }: Toolchain.Context) {
	const command = new Command('build');

	command.action(async () => {
		const { build } = await import('vite');

		await build(await resolveConfig(config.vite));
	});

	return command;
}
