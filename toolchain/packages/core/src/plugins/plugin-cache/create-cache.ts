import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathExists } from '../../utils/path-exists.js';

export interface ToolchainCacheApi {
	read(name: string, options?: any): Promise<Buffer>;
	write(name: string, data: any): Promise<void>;
	has(name: string): Promise<boolean>;
	invalidate(name: string): Promise<void>;
}

function parseCacheName(name: string): string[] {
	return name.split(':');
}

function getCacheFilePath(
	name: string,
	workspaceCache: string | null | undefined,
	localCache: string | null | undefined
): string {
	const [location, cacheName] = parseCacheName(name);
	const targetCache = location === 'workspace' ? workspaceCache : localCache;

	if (targetCache) {
		return resolve(targetCache, cacheName);
	}

	return null;
}

async function readCache(filePath, options?) {
	if (filePath == null || !(await pathExists(filePath))) {
		return null;
	}

	return await readFile(filePath, options);
}

async function writeCache(filePath, data, options?) {
	if (filePath == null) {
		return null;
	}

	const fileDir = dirname(filePath);

	if (!(await pathExists(fileDir))) {
		await mkdir(fileDir, { recursive: true });
	}

	return writeFile(filePath, data, options);
}

async function deleteCache(filePath) {
	if (filePath == null || !(await pathExists(filePath))) {
		return null;
	}

	return unlink(filePath);
}

export function createCache(context: Toolchain.Context): ToolchainCacheApi {
	const { meta } = context;
	const inMemory = new Map();

	async function write(name: string, data: unknown): Promise<void> {
		const cacheFilePath = getCacheFilePath(name, meta.workspace?.cache, meta.package?.cache);

		inMemory.set(name, data);

		return writeCache(cacheFilePath, data);
	}

	async function read(name: string, options?: any): Promise<Buffer> {
		if (inMemory.has(name)) {
			return inMemory.get(name);
		}

		const cacheFilePath = getCacheFilePath(name, meta.workspace?.cache, meta.package?.cache);

		return readCache(cacheFilePath, options);
	}

	async function has(name: string): Promise<boolean> {
		if (inMemory.has(name)) {
			return true;
		}

		const cacheFilePath = getCacheFilePath(name, meta.workspace?.cache, meta.package?.cache);

		return pathExists(cacheFilePath);
	}

	function invalidate(name: string) {
		inMemory.delete(name);

		const cacheFilePath = getCacheFilePath(name, meta.workspace?.cache, meta.package?.cache);

		return deleteCache(cacheFilePath);
	}

	return { read, write, has, invalidate };
}
