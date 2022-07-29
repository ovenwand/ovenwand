import { resolve } from 'path';
import { promises as fsp } from 'fs';
import { spawn } from 'child_process';

export async function exec(command, args, options) {
	return new Promise((resolve, reject) => {
		const child = spawn(command, args, { stdio: 'inherit', ...options });

		child.on('error', reject);
		child.on('close', resolve);
	});
}

export async function getApps() {
	const apps = [];
	const appsDir = resolve('apps'); // TODO
	const dirs = await fsp.readdir(appsDir);

	for (const dir of dirs) {
		const stats = await fsp.lstat(resolve(appsDir, dir));

		if (stats.isDirectory()) {
			const appPkgDir = resolve(appsDir, dir, 'package.json');
			const appPkgJson = await fsp.readFile(appPkgDir);
			const appPkg = JSON.parse(appPkgJson.toString());
			apps.push(appPkg);
		}
	}

	return apps;
}
