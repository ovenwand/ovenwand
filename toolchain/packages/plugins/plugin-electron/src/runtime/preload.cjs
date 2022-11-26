const { env, versions } = require('node:process');
const { access } = require('node:fs/promises');
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
	node: () => versions.node,
	chrome: () => versions.chrome,
	electron: () => versions.electron,
	ping: () => ipcRenderer.invoke('ping'),
	// we can also expose variables, not just functions
});

(async () => {
	try {
		await access(env.ELECTRON_PRELOAD_FILE);
		require(env.ELECTRON_PRELOAD_FILE);
	} catch(e) {
		if (e.code !== 'ENOENT') {
			throw e;
		}
	}
})();