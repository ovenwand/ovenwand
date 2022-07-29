import { spawn } from 'child_process';

export async function exec(command, args, options) {
	return new Promise((resolve, reject) => {
		const child = spawn(command, args, { stdio: 'inherit', ...options });
		child.on('error', reject);
		child.on('close', resolve);
	});
}
