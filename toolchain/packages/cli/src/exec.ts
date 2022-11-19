import { spawn as _spawn, fork as _fork, type SpawnOptions as _SpawnOptions, type ForkOptions as _ForkOptions } from 'node:child_process';

export type AsyncProcessOptions = { immediate?: true };
export type AsyncProcessResult = { ok: boolean, code: number, output: string, error: string };
export type SpawnOptions = _SpawnOptions & AsyncProcessOptions;
export type ForkOptions = _ForkOptions & AsyncProcessOptions;

export const fork = (command: string, args: string[] = [], options: ForkOptions = {}) => createAsyncProcess('fork', command, args, options);
export const exec = (command: string, args: string[] = [], options: SpawnOptions = {}) => createAsyncProcess('spawn', command, args, options);

function createAsyncProcess<T extends 'fork' | 'spawn'>(type: T, command: string, args = [], options: T extends 'fork' ? ForkOptions : SpawnOptions = {}): Promise<AsyncProcessResult> {
	return new Promise<AsyncProcessResult>((resolve, reject) => {
		let output = '';
		const error = '';

		const result = (code) => ({
			ok: code === 0,
			code,
			output,
			error
		});

		const next = (resolveNext, rejectNext) => {
			child.on('error', rejectNext);
			child.on('close', (code) => resolveNext(result(code)));
		};

		const child = type === 'fork'
			? _fork(command, args, { stdio: 'inherit', ...options })
			: _spawn(command, args, { stdio: 'inherit', ...options });

		if (options.stdio === 'pipe') {
			child.stdout.on('data', (message) => (output += message.toString()));
			child.stderr.on('data', (message) => (output += message.toString()));
		}

		if (options.immediate) {
			return resolve({
				child,
				next: () => new Promise(next)
			});
		}

		return next(resolve, reject);
	});
}
