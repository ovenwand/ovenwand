import { argv, exit } from 'node:process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { fork } from 'node:child_process';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const esmLoader = require.resolve('@esbuild-kit/esm-loader');

const { abort, signal } = new AbortController();

function spawn() {
	const child = fork(resolve(__dirname, '../src/bin/toolchain.ts'), argv.slice(2), {
		signal,
		execArgv: ['--loader', esmLoader],
		stdio: 'inherit'
	});

	child.on('exit', exit);

	child.on('restart', () => {
		abort();
		spawn();
	});
}

spawn();
