import { spawn } from 'child_process';

export async function exec(command, args, options = {}) {
	return new Promise((resolve, reject) => {
		let output = '';
		let error = '';

		const result = (code) => ({
			ok: code === 0,
			code,
			output,
			error
		});

		const next = (resolveNext, rejectNext) => {
			child.on('error', rejectNext);
			child.on('close', (code) => resolveNext(result(code, output, error)));
		};

		const child = spawn(command, args, { stdio: 'inherit', ...options });

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
