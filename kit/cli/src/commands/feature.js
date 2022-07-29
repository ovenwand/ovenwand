import { resolve } from 'path';
import { Command } from 'commander';
import { createCommand, doppler } from '../utils/index.js';

const ENV_FEATURE_KEY = 'VITE_FEATURE_FLAGS';

const StatusType = {
	[0]: 'disabled',
	[1]: 'enabled'
};

export async function feature() {
	const program = new Command('feature')
		.requiredOption('-p, --project <project>', '') // TODO allow omitting project param when running from project dir
		.option('-e, --env <environment>', '', process.env.NODE_ENV || 'development');

	program
		.addCommand(
			new Command('create')
				.alias('set')
				.argument('<feature>')
				.argument('[status]', '', 0)
				.action(await createFeatureCommand(setFeature))
		)
		.addCommand(
			new Command('remove')
				.alias('delete')
				.argument('<feature>')
				.action(await createFeatureCommand(deleteFeature))
		)
		.addCommand(
			new Command('status')
				.alias('get')
				.argument('<feature>')
				.action(await createFeatureCommand(getFeature))
		)
		.addCommand(
			new Command('start')
				.alias('enable')
				.argument('<feature>')
				.action(
					await createFeatureCommand((params) =>
						setFeature({ ...params, args: [params.args[0], 1] })
					)
				)
		)
		.addCommand(
			new Command('stop')
				.alias('disable')
				.argument('<feature>')
				.action(
					await createFeatureCommand((params) =>
						setFeature({ ...params, args: [params.args[0], 0] })
					)
				)
		);

	return program;
}

const createFeatureCommand = (action) =>
	createCommand(async (feature, status, options, command, context) => {
		if (!context) {
			context = command;
			command = options;
			options = status;
		}

		// TODO don't depend on _optionValues
		options = { ...command.parent._optionValues, ...options };

		const { args } = command;
		const { paths } = context;

		const params = {
			config: resolve(paths.kit, 'config', '.doppler.yaml'),
			args,
			options,
			paths
		};

		const values = await action(params);

		console.log(
			`
project: ${options.project}
env: ${options.env}
name: ${params.args[0]}
status: ${StatusType[values[0]] ?? 'non-existent'}
`.trim()
		);
	});

async function getFeature(params) {
	const [key] = params.args;

	const features = await getFeatures(params);

	return [features[key]];
}

async function setFeature(params) {
	const [key, value] = params.args;

	let features = await getFeatures(params);

	features[key] = value;

	features = await setFeatures(params, features);

	return [features[key]];
}

async function deleteFeature(params) {
	const [key] = params.args;

	let features = await getFeatures(params);

	delete features[key];

	features = await setFeatures(params, features);

	return [features[key]];
}

async function getFeatures(params) {
	const { paths, options } = params;

	const result = await doppler(
		['secrets', 'get', ENV_FEATURE_KEY],
		{
			project: options.project,
			paths,
			env: options.env
		},
		{
			stdio: 'pipe'
		}
	);

	return parseResult(result);
}

async function setFeatures(params, features) {
	const { paths, options } = params;
	const data = JSON.stringify(features);

	const result = await doppler(
		['secrets', 'set', ENV_FEATURE_KEY, data],
		{
			project: options.project,
			paths,
			env: options.env
		},
		{
			stdio: 'pipe'
		}
	);

	return parseResult(result);
}

async function parseResult(result) {
	const data = JSON.parse(result.output);
	return JSON.parse(data[ENV_FEATURE_KEY].computed);
}
