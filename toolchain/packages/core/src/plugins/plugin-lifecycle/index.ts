import { definePlugin, PRIORITY } from '../../define-plugin.js';

export const name = 'core:lifecycle';

export const priority = PRIORITY.CORE;

export default definePlugin((context) => {
	const { hooks } = context;

	hooks.create('prepare', { priority: -10 });
	hooks.create('resolve', { priority: 0 });

	return async ({ logger }: Toolchain.Context) => {
		const debug = logger.debug('toolchain:plugin-lifecycle');

		debug('Calling hooks:');

		for (const hook of hooks.hooks) {
			await Promise.all(hooks.call(hook.name, context));

			debug(` - ${hook.name} (priority: ${hook.priority})`);
		}
	};
});
