import { delimiter, join } from 'node:path';
import { stat } from 'node:fs/promises';
import { env } from 'node:process';

export async function findExecutable(executable: string) {
	const envPath = env.PATH || "";
	const envExt = env.PATHEXT || "";
	const pathDirs = envPath
		.replace(/["]+/g, "")
		.split(delimiter)
		.filter(Boolean);
	const extensions = envExt.split(";");
	const candidates = pathDirs.flatMap((d) =>
		extensions.map((ext) => join(d, executable + ext))
	);
	try {
		return await Promise.any(candidates.map(checkFileExists));
	} catch (e) {
		return null;
	}

	async function checkFileExists(filePath) {
		if ((await stat(filePath)).isFile()) {
			return filePath;
		}
		throw new Error("Not a file");
	}
}
