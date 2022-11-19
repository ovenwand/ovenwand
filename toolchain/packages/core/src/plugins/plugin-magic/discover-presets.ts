import { findDependenciesFromContext, importDependencies } from '../../utils/index.js';

export async function discoverPresets(context) {
	const dependencies = await findDependenciesFromContext(context, (name) =>
		name.startsWith('@ovenwand/toolchain.presets.') ||
		name.includes('toolchain-preset-')
	);

	return importDependencies(dependencies);
}
