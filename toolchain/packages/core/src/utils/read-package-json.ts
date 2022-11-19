import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export async function readPackageJson(path) {
	if (!path) {
		return null;
	}

	const manifest = require(path);

	return { manifest };
}
