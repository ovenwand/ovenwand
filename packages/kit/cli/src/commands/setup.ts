import { createCommand, doppler } from '../utils';

export const setup = createCommand(async (...commandArgs) => {
	const context = commandArgs.pop();
	const { paths } = context;

	await doppler(['login'], {
		paths
	});
});
