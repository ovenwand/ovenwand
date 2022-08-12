import { resolve } from 'node:path';
import { Command } from 'commander';
import { createCommand, doppler } from '../utils';

export async function env() {
	const program = new Command('env')
		.option('-p, --project <project>', 'only required executed outside a project dir') // TODO allow omitting project param when running from project dir
		.option('-e, --env <environment>', '', process.env.NODE_ENV || 'development');

	program
		.addCommand(new Command('login').action(await createEnvCommand(login)))
		.addCommand(new Command('logout').action(await createEnvCommand(logout)))
		.addCommand(new Command('setup').action(await createEnvCommand(setup)))
		.addCommand(new Command('run').action(await createEnvCommand(run)))
		.addCommand(new Command('get').argument('<key>').action(await createEnvCommand(get)))
		.addCommand(
			new Command('set')
				.argument('<key>')
				.argument('<value>')
				.action(await createEnvCommand(set))
		);

	return program;
}

const createEnvCommand = (action) =>
	createCommand(async (...commandArgs) => {
		const context = commandArgs.pop();
		const options = commandArgs.pop();

		const { args } = context.command;
		const { paths } = context;

		const params = {
			config: resolve(paths.kit, 'config', '.doppler.yaml'),
			args,
			options,
			paths
		};

		await action(params);
	});

async function login(params) {
	const { paths, options, args } = params;

	await doppler(['login', ...args], {
		project: options.project,
		paths,
		env: options.env
	});
}

async function logout(params) {
	const { paths, options, args } = params;

	await doppler(['logout', ...args], {
		project: options.project,
		paths,
		env: options.env
	});
}

async function setup(params) {
	const { paths, options, args } = params;

	await doppler(['setup', ...args], {
		project: options.project,
		paths,
		env: options.env
	});
}

async function run(params) {
	const { args, options, paths } = params;

	await doppler(['run', '--', ...args], {
		project: options.project,
		paths,
		env: options.env
	});
}

async function get(params) {
	const { paths, options, args } = params;

	const result = await doppler(
		['secrets', 'get', ...args],
		{
			project: options.project,
			paths,
			env: options.env
		},
		{
			stdio: 'pipe'
		}
	);

	const values = parseResult(result);

	console.log(
		`
project: ${options.project}
env: ${options.env}
name: ${args[0]}
value: ${values[0]}
`.trim()
	);
}

async function set(params) {
	const { paths, options, args } = params;

	const result = await doppler(
		['secrets', 'set', ...args],
		{
			project: options.project,
			paths,
			env: options.env
		},
		{
			stdio: 'pipe'
		}
	);

	const values = parseResult(result);

	console.log(
		`
project: ${options.project}
env: ${options.env}
name: ${args[0]}
value: ${values[0]}
`.trim()
	);
}

function parseResult({ data }) {
	const values = [];

	for (const value of Object.values(data)) {
		values.push(value.computed);
	}

	return values;
}
