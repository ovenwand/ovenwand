import { createLogger, registerPlugin, type ToolchainLoggerApi } from './utils/index.js';
import type { ToolchainPlugin } from './define-plugin.js';

interface ToolchainCoreContext extends Partial<Toolchain.Context> {
	logger: ToolchainLoggerApi;
	plugins: ToolchainPlugin[];
}

export function createToolchain() {
	const created = new Promise<ToolchainCoreContext>(async (done) => {
		const context: Partial<ToolchainCoreContext> = {};

		context.plugins = [];

		const logger = context.logger = createLogger(context);

		logger.debug('toolchain: Importing core plugins...');

		const corePlugins = [
			await import('./plugins/plugin-meta/index.js'),
			await import('./plugins/plugin-cache/index.js'),
			await import('./plugins/plugin-magic/index.js'),
			await import('./plugins/plugin-hooks/index.js'),
			await import('./plugins/plugin-env/index.js'),
			await import('./plugins/plugin-lifecycle/index.js'),
		];

		logger.debug('toolchain: Registering core plugins:');

		for (const plugin of corePlugins) {
			logger.debug('toolchain:', `  - ${plugin.name}`);
			await registerPlugin(plugin, context);
		}

		logger.debug('toolchain: Storting core plugins...');

		// Make sure they are sorted by priority before starting
		context.plugins.sort((a, b) => a.priority - b.priority);

		return done(context as ToolchainCoreContext);
	});

	async function start() {
		const context = await created;
		const { logger } = context;
		const corePlugins = [...context.plugins];

		logger.debug('toolchain:', 'Loading core plugins...');

		for (const plugin of corePlugins) {
			if (typeof plugin === 'function') {
				logger.debug('toolchain:', `Loading "${plugin.name}"`);
				await plugin(context as Toolchain.Context);
			}
		}
	}

	return { start };
}
