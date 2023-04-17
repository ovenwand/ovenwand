import { env } from 'node:process';
import { definePlugin, PRIORITY } from '@ovenwand/toolchain.core';

export const name = 'core:env';

export const priority = PRIORITY.CORE;

export default definePlugin((context: Toolchain.Context) => {
	context.env = env;

	context.hooks.create('environment', {
		priority: -100,

		handle: async (hook) => {
			context.env = await hook(context.env, context);
			return context.env;
		}
	});

	return {
		async configure(config) {
			config.env = {};
			return config;
		}
	};
});
