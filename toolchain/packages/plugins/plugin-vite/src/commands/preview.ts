import { performance } from 'node:perf_hooks';
import { Command } from '@ovenwand/toolchain.cli';
import { resolveConfig } from '../utils/resolve-config.js';
import { printServerBanner } from '../utils/print-server-banner.js';

export function createPreviewCommand({ config }: Toolchain.Context) {
	const command = new Command('preview');

	command.action(async () => {
		const { preview } = await import('vite');
		const startupBegin = performance.now();

		const server = await preview(await resolveConfig(config.vite));

		await printServerBanner(server, Math.ceil(performance.now() - startupBegin));
	});

	return command;
}
