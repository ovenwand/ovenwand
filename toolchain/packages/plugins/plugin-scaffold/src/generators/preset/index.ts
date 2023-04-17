import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
	name: 'toolchain:preset',
	config: {
		description: 'Generate a new toolchain preset',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is the name of the preset?',
				filter: (input) => input.toLowerCase().replace(/ /g, '-'),
				validate: required('Name is required')
			},
			{
				type: 'input',
				name: 'location',
				message: 'Where will the preset be located?',
				default: (options) => `./toolchain/packages/presets/preset-${options.name}`,
				filter: (input) => resolve(input),
				validate: required('Package location is required')
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
					type: 'module',
					private: true,
					version: '0.0.0',
					language: 'ts',
					src: 'src',
					dist: 'dist'
				}
			}
		]
	}
};

function required(message = 'Required') {
	return (value) => !!value || message;
}
