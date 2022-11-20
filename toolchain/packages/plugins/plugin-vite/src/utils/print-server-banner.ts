import { colors } from '@ovenwand/toolchain.cli';
import { version as viteVersion } from 'vite';

export function printServerBanner(server, startupTime) {
	const { info } = server.config.logger;

	const brand = colors.bold('VITE');
	const version = `v${viteVersion}`;
	const startupDuration = colors.reset(colors.bold(startupTime));

	info(
		`\n  ${colors.green(`${brand} ${version}`)}  ${colors.dim(`ready in ${startupDuration} ms`)}\n`,
		{ clear: !server.config.logger.hasWarned }
	);

	server.printUrls();
}
