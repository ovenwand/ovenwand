import { Command } from '@ovenwand/toolchain.cli';

export function createInstallCommand({ logger }) {
	const command = new Command('install');

	command.action(() => logger.log('https://docs.doppler.com/docs/install-cli'));

	return command;
}