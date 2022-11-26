import { definePlugin, PRIORITY } from '@ovenwand/toolchain.core';

export const name = 'config';

export const priority = PRIORITY.CORE;

export const enforce = 'post';

export default definePlugin((context) => {
	context.config = {};

	context.hooks.create('configure', {
		priority: -50,

		handle: async (hook) => {
			context.config = await hook(context.config, context);
			return context.config;
		}
	});

	return {};
});
