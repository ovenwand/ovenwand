import { definePlugin, type DefineToolchainPlugin, type ToolchainPluginDefinition } from './define-plugin.js';

export function definePreset(preset: ToolchainPluginDefinition | DefineToolchainPlugin): DefineToolchainPlugin {
	return definePlugin(preset);
}
