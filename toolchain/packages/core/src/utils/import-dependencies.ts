import { resolve } from 'node:path';

export async function importDependencies(
	dependencies,
	mapImport = (module) => ({ ...module }),
	sort = (a, b) => a.priority - b.priority
) {
	const modules = [];

	for (const dependency of dependencies) {
		const defaultExportPath = resolve(
			dependency.path,
			dependency.manifest.exports['.']
		);

		const module = mapImport(await import(defaultExportPath));

		module.path = dependency.path;
		module.manifest = dependency.manifest;

		modules.push(module);
	}

	return modules.sort(sort);
}
