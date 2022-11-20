import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export async function readTurboJson(turboJsonFile) {
	return require(turboJsonFile);
}
