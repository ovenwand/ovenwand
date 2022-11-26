const { env } = require('node:process');
const { app } = require('electron');
const { loadElectronEntry } = require('./utils.cjs');

/**
 * TODO Should probably have poke at https://github.com/cawa-93/vite-electron-builder and adapt some best practices.
 * For example: https://github.com/cawa-93/vite-electron-builder/blob/main/packages/main/src/security-restrictions.ts
 */
(async () => {
	const api = await loadElectronEntry(env.ELECTRON_ENTRY_FILE);

	await api.setup();

	await api.loadApp(
		api.createWindow()
	);
})();
