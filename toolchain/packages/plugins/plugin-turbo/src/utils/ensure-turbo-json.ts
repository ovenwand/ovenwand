import { access } from 'node:fs/promises';
import { writeTurboJson } from './write-turbo-json';
import { DEFAULT_TURBO_JSON } from './default-turbo-json';

export async function ensureTurboJson(turboJsonFile, defaultTurboJson = DEFAULT_TURBO_JSON) {
	try {
		await access(turboJsonFile);
	} catch(e) {
		if (e.code !== 'ENOENT') {
			throw new Error(e);
		}

		await writeTurboJson(turboJsonFile, defaultTurboJson);
	}
}
