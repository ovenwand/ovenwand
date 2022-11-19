import { resolve } from 'node:path';
import { readPackageJson } from './read-package-json.js';

export interface Manifest {
	name: string;
	type: 'module' | 'commonjs';
	version: string;
	exports: { '.': string } & Record<string, string | Record<string, string>>
	dependencies: Record<string, string>;
	devDependencies: Record<string, string>;
}

export interface Dependency {
	name: string;
	path: string;
	manifest: Manifest;
}

export async function readDependency(dependencyName: string, packagePath: string): Promise<Dependency> {
	const dependencyPath = resolve(packagePath, 'node_modules', dependencyName);
	const dependencyManifestPath = resolve(dependencyPath, 'package.json');
	const { manifest: dependencyManifest } = await readPackageJson(dependencyManifestPath);

	return {
		name: dependencyName,
		path: dependencyPath,
		manifest: dependencyManifest,
	};
}

export function findDependencies(manifests: Dependency[], filter: (name: string) => boolean | unknown): Promise<Dependency>[] {
	const dependencyQueue = [];

	for (const { manifest, path } of manifests) {
		const { devDependencies, dependencies } = manifest;
		const manifestDependencies = Object.keys({ ...devDependencies, ...dependencies }).filter(filter);

		for (const dependencyName of manifestDependencies) {
			dependencyQueue.push(
				readDependency(dependencyName, path)
			);
		}
	}

	return dependencyQueue;
}

export async function findDependenciesFromContext(context, filter: (name: string) => boolean | unknown): Promise<Dependency[]> {
	const { meta } = context;

	const manifests = [{
		name: meta.workspace.manifest.name,
		path: meta.workspace.path,
		manifest: meta.workspace.manifest,
	}];

	if (meta.package) {
		manifests.push({
			name: meta.package.manifest.name,
			path: meta.package.path,
			manifest: meta.package.manifest,
		});
	}

	const dependencies = await Promise.all(findDependencies(manifests, filter));

	const uniqueDependencies = new Set();

	return dependencies.filter((dependency) => {
		if (!uniqueDependencies.has(dependency.name)) {
			uniqueDependencies.add(dependency.name);
			return true;
		}

		return false;
	});
}
