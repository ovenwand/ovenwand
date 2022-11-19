export type ToolchainPluginLoad = { (context: Toolchain.Context): unknown | Promise<unknown> };
export type ToolchainPluginDefinition = Partial<Toolchain.Hooks> | (Partial<Toolchain.Hooks> & ToolchainPluginLoad);
export type DefineToolchainPlugin = (context: Toolchain.Context) => ToolchainPluginDefinition | Promise<ToolchainPluginDefinition>;

export interface ToolchainPluginModule {
	default: DefineToolchainPlugin;
	name: string;
	priority?: number;
}

export type ToolchainPlugin = ToolchainPluginDefinition & {
	name: string;
	priority: number;
};

export const PRIORITY = Object.freeze({
	CORE: -100,
	SYSTEM: -10,
	DEFAULT: 0,
});

export function definePlugin(plugin: ToolchainPluginDefinition | DefineToolchainPlugin): DefineToolchainPlugin {
	return (context) => typeof plugin === 'function' ? plugin(context) : plugin;
}
