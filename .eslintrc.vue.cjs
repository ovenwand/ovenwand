module.exports = {
	parser: '@typescript-eslint/parser',

	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	],

	plugins: ['vue', '@typescript-eslint'],

	ignorePatterns: ['*.cjs', '*.svelte'],

	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},

	env: {
		browser: true,
		es2017: true,
		node: true
	},

	settings: {
		react: {
			version: '18'
		}
	},

	rules: {
		'@typescript-eslint/ban-types': [
			'error',
			{
				types: {
					'{}': false
				}
			}
		]
	}
};
