import { registerPlugin } from '../../utils/index.js';
import { definePlugin, PRIORITY } from '../../define-plugin.js';
import { discoverPlugins } from './discover-plugins.js';
import { discoverPresets } from './discover-presets.js';

export const name = 'core:magic';

export const priority = PRIORITY.CORE;

export default definePlugin((context) => {
	return async ({ logger }) => {
		const corePlugins = [...context.plugins];

		logger.debug('plugin-magic:', 'Discovering presets...');
		const presets = await discoverPresets(context);

		logger.debug('plugin-magic:', `Found: ${presets.map((preset) => preset.name).join(', ')}`);

		logger.debug('plugin-magic:', 'Discovering plugins...');
		const plugins = await discoverPlugins(context, presets);

		logger.debug('plugin-magic:', `Found: ${plugins.map((plugin) => plugin.name).join(', ')}`);

		logger.debug('plugin-magic:', 'Registering plugins:');

		for (const plugin of plugins) {
			logger.debug('plugin-magic:', ` - ${plugin.name}`);
			await registerPlugin(plugin, context);
		}

		logger.debug('plugin-magic:', 'Registering presets:');

		for (const preset of presets) {
			logger.debug('plugin-magic:', ` - ${preset.name}`);
			await registerPlugin(preset, context);
		}

		logger.debug('plugin-magic:', 'Sorting plugins...');

		context.plugins.sort((a, b) => a.priority - b.priority);

		logger.debug('plugin-magic:', 'Loading plugins...');

		for (const plugin of context.plugins) {
			if (typeof plugin === 'function' && !corePlugins.includes(plugin)) {
				logger.debug('plugin-magic:', `Loading "${plugin.name}"`);
				await plugin(context);
			}
		}
	};
});
