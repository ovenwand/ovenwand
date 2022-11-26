const { access } = require('node:fs/promises');
const { env, platform } = require('node:process');
const { resolve } = require('node:path');
const { app, BrowserWindow } = require('electron');

module.exports.loadElectronEntry = async function loadElectronEntry(entry) {
	let api = {
		async setup() {
			app.on('window-all-closed', () => {
				if (platform !== 'darwin') {
					app.quit();
				}
			});

			app.on('activate', () => {
				if (BrowserWindow.getAllWindows().length === 0) {
					api.loadApp(api.createWindow());
				}
			});

			await app.whenReady();
		},
		createWindow: () => new BrowserWindow({
			width: 800,
			height: 600,
			webPreferences: {
				sandbox: false,
				preload: resolve(__dirname, 'preload.cjs'),
			},
		}),
		async loadApp(targetWindow) {
			try {
				await targetWindow.loadURL(env.ELECTRON_APP_URL);
			} catch (e) {
				if (e.code === 'ERR_CONNECTION_REFUSED') {
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							api.loadApp(targetWindow).then(resolve).catch(reject);
						}, 1000);
					});
				} else {
					throw e;
				}
			}
		},
	};

	try {
		await access(entry);
		const { setup, createWindow, loadApp } = require(entry);
		api.setup = setup ?? api.setup;
		api.createWindow = createWindow ?? api.createWindow;
		api.loadApp = loadApp ?? api.loadApp;
	} catch(e) {
		if (e.code !== 'ENOENT') {
			throw e;
		}
	}

	return api;
}
