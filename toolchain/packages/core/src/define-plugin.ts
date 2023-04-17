export type ToolchainPluginLoad = { (context: Toolchain.Context): unknown | Promise<unknown> };
export type ToolchainPluginDefinition =
	| Partial<Toolchain.Hooks>
	| (Partial<Toolchain.Hooks> & ToolchainPluginLoad);
export type DefineToolchainPlugin = (
	context: Toolchain.Context
) => Partial<ToolchainPlugin> | Promise<Partial<ToolchainPlugin>>;

export interface ToolchainPluginModule {
	default: DefineToolchainPlugin;
	name: string;
	priority?: number;
	enforce?: 'pre' | 'post';
}

export type ToolchainPlugin = ToolchainPluginDefinition & {
	name: string;
	type: 'plugin' | 'preset';
	priority: number;
	enforce: 'pre' | 'post' | undefined;
};

export const PRIORITY = Object.freeze({
	CORE: -100,
	DEFAULT: 0
});

export function definePlugin(
	plugin: ToolchainPluginDefinition | DefineToolchainPlugin
): DefineToolchainPlugin {
	return (context) => {
		const pluginDefinition: Partial<ToolchainPlugin> =
			typeof plugin === 'function' ? plugin(context) : plugin;
		pluginDefinition.type = 'plugin';
		return pluginDefinition;
	};
}
