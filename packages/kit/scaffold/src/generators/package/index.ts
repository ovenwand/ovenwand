import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
	name: 'package',
	config: {
		description: 'Generate a new package',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is the name of the new package?',
				validate: required('Name is required')
			},
			{
				type: 'input',
				name: 'location',
				message: 'Where will the new package be located?',
				default: (options) => getPathFromPackageName(options.name),
				validate: required('Package location is required')
			},
			{
				type: 'list',
				name: 'language',
				choices: [
					{ name: 'TypeScript', value: 'ts' },
					{ name: 'JavaScript', value: 'js' }
				]
			}
		],
		actions: [
			{
				type: 'addMany',
				destination: '{{ location }}',
				base: resolve(__dirname, 'template'),
				templateFiles: resolve(__dirname, 'template', '**', '*.hbs'),
				data: {
					namespace: '@ovenwand',
					src: 'src',
					dist: 'dist'
				}
			}
		]
	}
};

async function getPathFromPackageName(name) {
	let location = './packages';

	if (name) {
		const parts = name.split('.');
		const parentDir = join(location, ...parts.slice(0, -1));
		location = './' + join(parentDir, ...parts.slice(-1));
	}

	return location;
}

function required(message = 'Required') {
	return (value) => !!value || message;
}
