import { definePlugin } from '@ovenwand/toolchain.core';
import { Command } from '@ovenwand/toolchain.cli';

export const name = 'vite';

export default definePlugin((context) => {
	return {
		async configure(config: Toolchain.Config) {
			config.vite = {
				enabled: true,
				configs: []
			};

			return config;
		},

		async resolve({ config, cli, meta }: Toolchain.Context) {
			if (!config.vite.enabled) {
				return;
			}

			const { createDevCommand, createBuildCommand, createPreviewCommand } = await import(
				'./commands/index.js'
			);

			const devCommand = createDevCommand(context);
			const buildCommand = createBuildCommand(context);
			const previewCommand = createPreviewCommand(context);

			const viteCommand = new Command('vite')
				.addCommand(devCommand)
				.addCommand(buildCommand)
				.addCommand(previewCommand);

			if (meta.package) {
				cli.commands.add(viteCommand);
				cli.commands.add(devCommand);
				cli.commands.add(buildCommand);
				cli.commands.add(previewCommand);
			}
		}
	};
});
