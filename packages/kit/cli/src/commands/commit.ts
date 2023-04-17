import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Command } from 'commander';
import { commitlint, createCommand, exec, fileExists } from '../utils';

export async function commit() {
	const program = new Command('commit');

	program
		.option('-p, --prepare', 'Prepare commit')
		.option('-s, --stage', 'Stage commit')
		.option('-l, --lint', 'Lint commit')
		.action(await createCommit(program));

	return program;
}

const createCommit = () =>
	createCommand(async (...commandArgs) => {
		const context = commandArgs.pop();
		const options = commandArgs.pop();

		const { args } = context.command;
		const { paths } = context;

		const params = {
			args,
			options,
			paths,
			commitlintConfig: resolve(paths.kit, 'config', 'commitlint.config.cjs')
		};

		await prepareConfigurations(params);

		if (options.prepare) {
			await exec('changeset', []);
			await exec('git', ['add', resolve(paths.workspace, '.changeset')]);
		}

		if (options.stage) {
			const result = await exec('lint-staged');

			if (!result.ok) {
				return process.exit(result.code);
			}
		}

		if (options.lint) {
			const result = await commitlint(params);

			if (!result.ok) {
				return process.exit(result.code);
			}
		}
	});

async function prepareConfigurations(params) {
	const { options } = params;

	if (options.updateConfig || !(await fileExists(params.commitlintConfig))) {
		const commitlintConfig = fileURLToPath(
			await import.meta.resolve('@ovenwand/kit.lint/commitlint.config.cjs')
		);

		await exec('cp', [commitlintConfig, params.commitlintConfig]);
	}
}
