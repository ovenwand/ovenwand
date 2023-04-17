import type { ToolchainPlugin, ToolchainPluginModule } from '../define-plugin.js';
import { PRIORITY } from '../define-plugin.js';

export async function registerPlugin(
	module: ToolchainPluginModule,
	context: Partial<Toolchain.Context>
): Promise<void> {
	const plugin: Partial<ToolchainPlugin> = await module.default(context as Toolchain.Context);
	const { hooks, plugins } = context;

	Object.defineProperty(plugin, 'name', { value: module.name });
	Object.defineProperty(plugin, 'priority', { value: module.priority ?? PRIORITY.DEFAULT });
	Object.defineProperty(plugin, 'enforce', { value: module.enforce });

	plugins.push(plugin);

	if (!hooks) {
		return;
	}

	for (const hook of Object.keys(plugin)) {
		if (hooks.has(hook)) {
			hooks.add(hook, plugin[hook]);
		}
	}
}
