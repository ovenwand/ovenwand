import { performance } from 'node:perf_hooks';
import { Command } from '@ovenwand/toolchain.cli';
import { resolveConfig } from '../utils/resolve-config.js';
import { printServerBanner } from '../utils/print-server-banner.js';

export function createDevCommand({ config }) {
	const command = new Command('dev');

	command.action(async () => {
		const { createServer } = await import('vite');
		const startupBegin = performance.now();

		const server = await createServer(await resolveConfig(config.vite));

		await server.listen();

		await printServerBanner(server, Math.ceil(performance.now() - startupBegin));
	});

	return command;
}
