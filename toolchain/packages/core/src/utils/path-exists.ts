import { access } from 'node:fs/promises';

export async function pathExists(path) {
	try {
		await access(path);
		return true;
	} catch(e) {
		if (e.code !== 'ENOENT') {
			throw new Error(e);
		}

		return false;
	}
}
