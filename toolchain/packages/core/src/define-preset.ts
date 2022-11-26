import { definePlugin, type DefineToolchainPlugin, type ToolchainPluginDefinition } from './define-plugin.js';

export function definePreset(preset: ToolchainPluginDefinition | DefineToolchainPlugin): DefineToolchainPlugin {
	return async (context) => {
		const plugin = await definePlugin(preset)(context);
		plugin.type = 'preset';
		return plugin;
	};
}
