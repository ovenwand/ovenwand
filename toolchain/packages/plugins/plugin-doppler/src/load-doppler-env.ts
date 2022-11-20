import { fetchDopplerEnv } from './fetch-doppler-env.js';

export async function loadDopplerEnv(context) { // TODO only try loading doppler envs for existing projects
	const { cache, env, meta } = context;
	const workspaceManifest = meta.workspace.manifest;
	const localManifest = meta.package?.manifest;
	const workspaceCacheFile = 'workspace:env.json';
	const localCacheFile = 'local:env.json';

	if (!await cache.has(workspaceCacheFile)) {
		const dopplerProject = workspaceManifest.name.split('/')[1].replace(/\./g, '-');
		await cache.write(workspaceCacheFile, await fetchDopplerEnv(dopplerProject, context));
	}

	if (localManifest && !await cache.has(localCacheFile)) {
		const dopplerProject = localManifest.name.split('/')[1].replace(/\./g, '-');
		await cache.write(localCacheFile, await fetchDopplerEnv(dopplerProject, context));
	}

	const workspaceCache = await cache.read(workspaceCacheFile) ?? JSON.stringify({});
	const localCache = await cache.read(localCacheFile) ?? JSON.stringify({});

	const workspaceEnv = JSON.parse(workspaceCache);
	const localEnv = JSON.parse(localCache);

	for (const key of Object.keys(workspaceEnv)) {
		env[key] = workspaceEnv[key];
	}

	for (const key of Object.keys(localEnv)) {
		env[key] = localEnv[key];
	}

	return env;
}
