import { writeFile } from 'node:fs/promises';

export async function writeTurboJson(turboJsonFile, turboJson) {
	const turboJsonString = JSON.stringify(turboJson, null, '\t');
	return await writeFile(turboJsonFile, turboJsonString, 'utf-8');
}
