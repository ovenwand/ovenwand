import { definePlugin, PRIORITY } from '@ovenwand/toolchain.core';
import { createMeta } from './create-meta.js';

export const name = 'core:meta';

export const priority = PRIORITY.CORE;

export default definePlugin(async (context: Toolchain.Context) => {
	context.meta = await createMeta(context);
	return {};
});
