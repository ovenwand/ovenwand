import { createLogger, registerPlugin, type ToolchainLoggerApi } from './utils/index.js';
import type { ToolchainPlugin } from './define-plugin.js';

interface ToolchainCoreContext extends Partial<Toolchain.Context> {
	logger: ToolchainLoggerApi;
	plugins: ToolchainPlugin[];
}

export function createToolchain() {
	const logger = createLogger();
	const debug = logger.debug('toolchain');

	const created = new Promise<ToolchainCoreContext>(async (done) => {
		const context: Partial<ToolchainCoreContext> = {};

		context.logger = logger;
		context.plugins = [];

		debug('Importing core plugins...');

		// The order of this array decides the order in which the core plugins are registered and loaded
		const corePlugins = [
			await import('./plugins/plugin-meta/index.js'),
			await import('./plugins/plugin-cache/index.js'),
			await import('./plugins/plugin-magic/index.js'),
			await import('./plugins/plugin-hooks/index.js'),
			await import('./plugins/plugin-env/index.js'),
			await import('./plugins/plugin-lifecycle/index.js'),
		];

		debug(`Found: ${corePlugins.map((plugin) => plugin.name).join(', ')}`);

		for (const plugin of corePlugins) {
			await registerPlugin(plugin, context);
		}

		// Make sure they are sorted by priority before starting
		context.plugins.sort((a, b) => a.priority - b.priority);

		return done(context as ToolchainCoreContext);
	});

	async function start() {
		const context = await created;
		const corePlugins = [...context.plugins];

		debug('Loading core plugins...');

		for (const plugin of corePlugins) {
			if (typeof plugin === 'function') {
				debug(`Loading "${plugin.name}"`);
				await plugin(context as Toolchain.Context);
			}
		}
	}

	return { start };
}
