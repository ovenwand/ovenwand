import { findDependencies, findDependenciesFromContext, importDependencies } from '../../utils/index.js';

export async function discoverPlugins(context, presets = []) {
	const dependencies = await findDependenciesFromContext(context, (name) =>
		name.startsWith('@ovenwand/toolchain.plugins.') ||
		name.includes('toolchain-plugin-')
	);

	const presetDependencies = await Promise.all(findDependencies(presets, (name) =>
		name.startsWith('@ovenwand/toolchain.plugins.') ||
		name.includes('toolchain-plugin-')
	));

	for (const presetDependency of presetDependencies) {
		if (!dependencies.find((dependency) => dependency.name === presetDependency.name)) {
			dependencies.push(presetDependency);
		}
	}

	return importDependencies(dependencies);
}
