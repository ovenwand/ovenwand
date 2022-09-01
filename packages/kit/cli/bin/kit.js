import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const esmLoader = require.resolve('@esbuild-kit/esm-loader');

const child = spawn(
	'node',
	[
		'--loader',
		esmLoader,
		'--experimental-import-meta-resolve',
		resolve(__dirname, '../src/index.ts'),
		...process.argv.slice(2)
	],
	{
		stdio: 'inherit'
	}
);

child.on('close', process.exit);
