import { definePlugin, PRIORITY } from '../../define-plugin.js';
import { createHooks } from './create-hooks.js';

export const name = 'core:hooks';

export const priority = PRIORITY.CORE;

export default definePlugin((context) => {
	context.hooks = createHooks();
	return {};
});
