import { createCommand, exec } from '../utils';

export const setup = createCommand(async () => {
	await exec('doppler', ['login']);
	await exec('doppler', ['setup']);
});
