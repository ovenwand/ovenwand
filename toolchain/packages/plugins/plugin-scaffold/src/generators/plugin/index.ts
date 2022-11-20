import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
	name: 'toolchain:plugin',
	config: {
		description: 'Generate a new toolchain plugin',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'What is the name of the new plugin?',
				validate: required('Name is required')
			},
			{
				type: 'input',
				name: 'location',
				message: 'Where will the new plugin be located?',
				default: (options) => `./toolchain/packages/plugins/plugin-${options.name}`,
				validate: required('Package location is required')
			},
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
