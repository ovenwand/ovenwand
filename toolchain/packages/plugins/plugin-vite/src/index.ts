import { definePlugin } from '@ovenwand/toolchain.core';
import { Command } from '@ovenwand/toolchain.cli';
import { createDevCommand, createBuildCommand, createOptimizeCommand, createPreviewCommand } from './commands/index.js';

export { defineConfig } from 'vite';

export const name = 'vite';

export default definePlugin((context) => {
	return {
		async configure(config: Toolchain.Config) {
			config.vite = {
				enabled: true,
				configs: [],
			};

			return config;
		},

		async resolve({ config, cli, meta }: Toolchain.Context) {
			if (!config.vite.enabled) {
				return;
			}

			const devCommand = createDevCommand(context);
			const buildCommand = createBuildCommand(context);
			const optimizeCommand = createOptimizeCommand(context);
			const previewCommand = createPreviewCommand(context);

			const viteCommand = new Command('vite')
				.addCommand(devCommand)
				.addCommand(buildCommand)
				.addCommand(optimizeCommand)
				.addCommand(previewCommand);

			if (meta.package) {
				cli.commands.add(viteCommand)
				cli.commands.add(devCommand);
				cli.commands.add(buildCommand);
				cli.commands.add(optimizeCommand);
				cli.commands.add(previewCommand);
			}
		},
	}
});
