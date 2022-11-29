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
	} catch (e) {
		return false;
	}
}

export const name = 'doppler';

export default definePlugin((context) => {
	const debug = context.logger.debug('toolchain:plugin-doppler');

	return {
		async environment(env, { meta }) {
			debug('Looking for doppler executable in $PATH...');

			const dopplerBinPath = await findExecutable('doppler'); // TODO improve UX when doppler bin is not found

			debug(
				dopplerBinPath
					? `Found doppler bin at "${dopplerBinPath}"`
					: 'Could not find doppler bin, disabling doppler environment'
			);

			if (!dopplerBinPath || env.TOOLCHAIN_DOPPLER == null) {
				env.TOOLCHAIN_DOPPLER = String(Number(Boolean(dopplerBinPath)));
			}

			env.TOOLCHAIN_DOPPLER_CONFIG ??= resolve(meta.workspace.path, '.kit/config/.doppler.yaml'); // TODO find proper location to store doppler config

			const doppler = createConfig(context);

			// Set config early and freeze to prevent differences in the environment and config
			// before and after resolution, so the environment can be used reliably for configuration.
			// TODO decide if this is the right thing to do
			context.config.doppler = Object.freeze(doppler);

			if (!doppler.enabled) {
				debug('Will not load doppler environment, doppler has been disabled');
				return env;
			}

			debug('Looking for doppler config...');

			if (!(await doesDopplerConfigExist(context))) {
				// TODO improve UX when doppler config is not found
				debug(`Could not find doppler config at: ${env.TOOLCHAIN_DOPPLER_CONFIG}`);
				return env;
			}

			debug(`Found doppler config at "${env.TOOLCHAIN_DOPPLER_CONFIG}"`);

			const { env: dopplerEnv, workspaceEnv, localEnv } = await loadDopplerEnv(context, debug);

			if (workspaceEnv) {
				debug(`Loaded environment for "${meta.workspace.manifest.name}":`);
				debug(JSON.stringify(workspaceEnv, null, '  '));
			}

			if (localEnv) {
				debug(`Loaded environment for "${meta.package.manifest.name}":`);
				debug(JSON.stringify(localEnv, null, '  '));
			}

			return dopplerEnv;
		},

		async resolve({ cli, config }) {
			if (!config.doppler.enabled) {
				return;
			}

			cli.commands.add(createEnvCommand(context));
		}
	};
});
