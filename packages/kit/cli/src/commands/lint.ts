import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Command } from 'commander';
import { eslint, prettier } from '@ovenwand/kit.lint';
import { createCommand, exec, fileExists } from '../utils';

export async function lint() {
	const program = new Command('lint')
		.argument('<paths...>', 'Paths or patterns to lint')
		.option('--format', 'Write suggested changes to files in working directory')
		.option('-u, --update-config', 'Update configs in .kit with latest from @ovenwand/lint')
		.option('--prettier', 'Run only prettier')
		.option('--eslint', 'Run only eslint')
		.action(await createLint());

	return program;
}

const createLint = () =>
	createCommand(async (...commandArgs) => {
		const context = commandArgs.pop();
		const options = commandArgs.pop();

		const { args } = context.command;
		const { paths } = context;

		const params = {
			eslintConfig: resolve(paths.kit, 'config', '.eslintrc.cjs'),
			eslintReactConfig: resolve(paths.kit, 'config', '.eslintrc.react.cjs'),
			eslintSvelteConfig: resolve(paths.kit, 'config', '.eslintrc.svelte.cjs'),
			eslintVueConfig: resolve(paths.kit, 'config', '.eslintrc.vue.cjs'),
			eslintIgnore: resolve(paths.kit, 'config', '.eslintignore'),
			prettierConfig: resolve(paths.kit, 'config', '.prettierrc'),
			prettierIgnore: resolve(paths.kit, 'config', '.prettierignore'),
			args,
			options,
			paths
		};

		await prepareConfigurations(params);

		if (options.prettier || (!options.prettier && !options.eslint)) {
			await prettier(params, {
				stdio: 'inherit'
			});
		}

		if (options.eslint || (!options.eslint && !options.prettier)) {
			await eslint(params, {
				stdio: 'inherit'
			});
		}
	});

async function prepareConfigurations(params) {
	const { options } = params;

	if (options.updateConfig || !(await fileExists(params.eslintConfig))) {
		const eslintConfig = fileURLToPath(
			await import.meta.resolve('@ovenwand/kit.lint/.eslintrc.cjs')
		);
		await exec('cp', [eslintConfig, params.eslintConfig]);
	}

	if (options.updateConfig || !(await fileExists(params.eslintReactConfig))) {
		const eslintReactConfig = fileURLToPath(
			await import.meta.resolve('@ovenwand/kit.lint/.eslintrc.react.cjs')
		);
		await exec('cp', [eslintReactConfig, params.eslintReactConfig]);
	}

	if (options.updateConfig || !(await fileExists(params.eslintSvelteConfig))) {
		const eslintSvelteConfig = fileURLToPath(
			await import.meta.resolve('@ovenwand/kit.lint/.eslintrc.svelte.cjs')
		);
		await exec('cp', [eslintSvelteConfig, params.eslintSvelteConfig]);
	}

	if (options.updateConfig || !(await fileExists(params.eslintVueConfig))) {
		const eslintVueConfig = fileURLToPath(
			await import.meta.resolve('@ovenwand/kit.lint/.eslintrc.vue.cjs')
		);
		await exec('cp', [eslintVueConfig, params.eslintVueConfig]);
	}

	if (options.updateConfig || !(await fileExists(params.eslintIgnore))) {
		const eslintIgnore = fileURLToPath(
			await import.meta.resolve('@ovenwand/kit.lint/.eslintignore')
		);
		await exec('cp', [eslintIgnore, params.eslintIgnore]);
	}

	if (options.updateConfig || !(await fileExists(params.prettierConfig))) {
		const prettierConfig = fileURLToPath(
			await import.meta.resolve('@ovenwand/kit.lint/.prettierrc')
		);
		await exec('cp', [prettierConfig, params.prettierConfig]);
	}

	if (options.updateConfig || !(await fileExists(params.prettierIgnore))) {
		const prettierIgnore = fileURLToPath(
			await import.meta.resolve('@ovenwand/kit.lint/.prettierignore')
		);
		await exec('cp', [prettierIgnore, params.prettierIgnore]);
	}
}
