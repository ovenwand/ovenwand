import { cwd } from 'node:process';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { findWorkspace } from '@ovenwand/toolchain.core';

const __dirname = dirname(fileURLToPath(import.meta.url));

const workspace = findWorkspace();

const templateDir = fileURLToPath(new URL('template', import.meta.url));

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
				filter: async (input) => resolve(input),
				default: async (options) => relative(cwd(), resolve(await workspace, `toolchain/packages/plugins/plugin-${options.name}`)),
				validate: required('Package location is required')
			},
		],
		actions: [
			{
				type: 'addMany',
				destination: '{{ location }}',
				base: resolve(templateDir),
				templateFiles: resolve(templateDir, '**', '*.hbs'),
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
