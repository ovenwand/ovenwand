import { access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { definePlugin, findExecutable } from '@ovenwand/toolchain.core';
import { createEnvCommand } from './commands/env.js';
import { loadDopplerEnv } from './load-doppler-env.js';
import { createConfig } from './create-config.js';

async function doesDopplerConfigExist(context) {
	const { doppler } = context.config;

	try {
		await access(doppler.configFile);
		return true;
	} catch(e) {
		return false;
	}
}

export const name = 'doppler';

export default definePlugin((context) => {
	return {
		async environment(env) {
			env.OVEN_DOPPLER_ENV = env.OVEN_DOPPLER_ENV ?? String(Number(!!await findExecutable('doppler')));
			env.OVEN_DOPPLER_CONFIG = env.OVEN_DOPPLER_CONFIG ?? resolve(context.meta.workspace.path, '.kit/config/.doppler.yaml'); // TODO find proper location to store doppler config

			const doppler = createConfig(context);

			// Set config early and freeze to prevent differences in the environment and config
			// before and after resolution, so the environment can be used reliably for configuration.
			context.config.doppler = Object.freeze(doppler);

			if (!doppler.enabled || !await doesDopplerConfigExist(context)) {
				return env;
			}

			return await loadDopplerEnv(context);
		},

		async resolve({ cli, config }) {
			if (!config.doppler.enabled) {
				return;
			}

			cli.commands.add(
				createEnvCommand(context)
			);
		}
	};
});