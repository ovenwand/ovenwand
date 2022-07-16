import { spawn } from 'child_process';

export async function setup() {
	const setupChild = spawn('doppler', ['login'], { stdio: 'inherit' });

	setupChild.on('close', () => {
		spawn('doppler', ['setup'], { stdio: 'inherit' });
	});
}
