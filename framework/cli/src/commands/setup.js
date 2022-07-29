import { exec } from '../utils.js';

export async function setup() {
	await exec('doppler', ['login']);
	await exec('doppler', ['setup']);
}
