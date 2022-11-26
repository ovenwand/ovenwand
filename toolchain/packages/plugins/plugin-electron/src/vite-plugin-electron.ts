import { env } from 'node:process';
import { resolve } from 'node:path';
import { exec/*, exit*/ } from '@ovenwand/toolchain.cli';

export interface VitePluginElectronOptions {
	entry?: string;
	env?: Record<string, string>;
}

export function electron(options: VitePluginElectronOptions = {}) {
	options.entry ??= './src/electron.cjs';
	options.env ??= env;

	let config;
	let electronProcess;

	async function serve(url: string): Promise<void> {
		const args = [options.entry];

		if (config?.mode === 'development') {
			args.unshift('--ignore-certificate-errors');

			electronProcess = await exec('electron', args, {
				immediate: true,
				env: {
					...options.env,
					ELECTRON_APP_URL: url, // TODO support https
					ELECTRON_ENTRY_FILE: resolve('./src/electron.cjs'), // TODO support dynamic entry point
					ELECTRON_PRELOAD_FILE: resolve('./src/preload.cjs'), // TODO support dynamic entry point
				},
			});
		}

		// To exit or not to exit, that is the question
		// electronProcess?.child.on('exit', exit);

		return electronProcess;
	}

	function configureElectronDevServer(server) {
		const listen = server.httpServer.listen.bind(server.httpServer);

		server.httpServer.listen = (port, host, callback) => listen(port, host, (...args) => {
			const url = new URL(`${config.server.https ? 'https' : 'http'}://${host}:${port}`);
			callback?.(...args);
			serve(url.toString());
		});
	}

	return {
		name: 'toolchain:electron',

		apply: 'serve',

		configResolved(resolvedConfig) {
			config = resolvedConfig;
		},

		configureServer(server) {
			configureElectronDevServer(server);
		},

		configurePreviewServer(server) {
			configureElectronDevServer(server);
		},

		closeBundle() {
			electronProcess?.child.kill();
		},
	};
}
