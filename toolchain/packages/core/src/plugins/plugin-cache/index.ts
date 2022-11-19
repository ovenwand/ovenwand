import { resolve } from 'node:path';
import { definePlugin, PRIORITY } from '@ovenwand/toolchain.core';
import { createCache } from './create-cache.js';

export const name = 'core:cache';

export const priority = PRIORITY.CORE;

export default definePlugin((context: Toolchain.Context) => {
	const { meta } = context;

	if (meta.workspace) {
		meta.workspace.cache = resolve(meta.workspace.path, 'node_modules/.cache/toolchain');
	}

	if (meta.package) {
		meta.package.cache = resolve(meta.package.path, 'node_modules/.cache/toolchain');
	}

	context.cache = createCache(context);
	return {};
});
