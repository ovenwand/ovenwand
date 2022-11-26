import { importDependencies, registerPlugin } from '../../utils/index.js';
import { definePlugin, PRIORITY } from '../../define-plugin.js';
import { discoverPlugins } from './discover-plugins.js';
import { discoverPresets } from './discover-presets.js';

export const name = 'core:magic';

export const priority = PRIORITY.CORE;

export default definePlugin((context) => {
	return async ({ logger }) => {
		const debug = logger.debug('toolchain:plugin-magic');
		const corePlugins = [...context.plugins];

		debug('Discovering presets...');
		const presetDependencies = await discoverPresets(context);
		debug(`Found: ${presetDependencies.map((preset) => preset.name).join(', ')}`);

		debug('\nDiscovering plugins...');
		const pluginDependencies = await discoverPlugins(context, presetDependencies);
		debug(`Found: ${pluginDependencies.map((plugin) => plugin.name).join(', ')}`);

		debug('\nImporting plugins...');
		const plugins = await importDependencies(pluginDependencies, debug);

		for (const plugin of plugins) {
			await registerPlugin(plugin, context);
		}

		debug('\nImporting presets...');
		const presets = await importDependencies(presetDependencies, debug);

		for (const preset of presets) {
			await registerPlugin(preset, context);
		}

		context.plugins.sort((a, b) => a.priority - b.priority);

		debug('\nLoading plugins...');

		for (const plugin of context.plugins) {
			if (typeof plugin === 'function' && !corePlugins.includes(plugin)) {

				debug(`Loading "${plugin.type}:${plugin.name}"`);
				await plugin(context);
			}
		}
	};
});
