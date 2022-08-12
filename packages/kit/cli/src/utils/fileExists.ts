import { F_OK, promises as fsp } from 'node:fs';

export async function fileExists(plopfile) {
	try {
		await fsp.access(plopfile, F_OK);
		return true;
	} catch (e) {
		if (e.code === 'ENOENT') {
			return false;
		}

		throw e;
	}
}
