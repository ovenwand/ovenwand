import { fetchDopplerEnv } from './fetch-doppler-env.js';

export async function loadDopplerEnv(context, debug) {
	// TODO only try loading doppler envs for existing projects
	const { cache, env, meta } = context;
	const workspaceManifest = meta.workspace?.manifest;
	const localManifest = meta.package?.manifest;
	const workspaceCacheFile = 'workspace:env.json';
	const localCacheFile = 'local:env.json';

	let workspaceEnv, localEnv;

	// TODO this is temporary, either remove caching all together or find way to cache properly
	cache.invalidate(localCacheFile);

	if (workspaceManifest) {
		if (!(await cache.has(workspaceCacheFile))) {
			debug(`Generating environment cache for ${workspaceManifest.name}`);
			const dopplerProject = workspaceManifest.name.split('/')[1].replace(/\./g, '-');
			await cache.write(workspaceCacheFile, await fetchDopplerEnv(dopplerProject, context));
		} else {
			debug(`Loading environment for ${workspaceManifest.name} from cache`);
		}

		const workspaceCache = (await cache.read(workspaceCacheFile)) ?? JSON.stringify({});
		workspaceEnv = JSON.parse(workspaceCache);

		for (const key of Object.keys(workspaceEnv)) {
			env[key] = workspaceEnv[key];
		}
	}

	if (localManifest) {
		if (!(await cache.has(localCacheFile))) {
			debug(`Generating environment cache for ${localManifest.name}`);
			const dopplerProject = localManifest.name.split('/')[1].replace(/\./g, '-');
			await cache.write(localCacheFile, await fetchDopplerEnv(dopplerProject, context));
		} else {
			debug(`Loading environment for ${localManifest.name} from cache`);
		}

		const localCache = (await cache.read(localCacheFile)) ?? JSON.stringify({});
		localEnv = JSON.parse(localCache);

		for (const key of Object.keys(localEnv)) {
			env[key] = localEnv[key];
		}
	}

	return { env, workspaceEnv, localEnv };
}
