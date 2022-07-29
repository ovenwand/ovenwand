import { createCommand, exec } from '../utils/index.js';

export const setup = createCommand(async () => {
	await exec('doppler', ['login']);
	await exec('doppler', ['setup']);
});
