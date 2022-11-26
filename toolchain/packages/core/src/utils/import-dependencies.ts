import { resolve } from 'node:path';
import { PRIORITY } from '../define-plugin.js';
import { byPriority } from './by-priority.js';
import type { Dependency } from './find-dependencies.js';

export async function importDependencies(dependencies: Dependency[], debug?: (...args: unknown[]) => unknown) {
	const modules = [];

	for (const dependency of dependencies) {
		const defaultExportPath = resolve(
			dependency.path,
			dependency.manifest.exports['.']
		);

		const module = { ...await import(defaultExportPath) };

		module.priority ??= PRIORITY.DEFAULT; // Hmm, would be nicer if importDependencies didn't care
		module.path = dependency.path;
		module.manifest = dependency.manifest;

		modules.push(module);
	}

	return modules.sort(byPriority);
}
