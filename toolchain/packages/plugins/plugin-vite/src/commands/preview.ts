import { preview } from 'vite';
import { Command } from '@ovenwand/toolchain.cli';
import { resolveConfig } from '../utils/resolve-config.js';

export function createPreviewCommand({ config, meta, env }: Toolchain.Context) {
	const command = new Command('preview');

	command.action(async (options, command) => {
		const { preview } = await import('vite');

		await preview(
			resolveConfig(config.vite)
		);
	});

	return command;
}