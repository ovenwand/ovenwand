module.exports = {
	parser: '@typescript-eslint/parser',

	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	],

	plugins: ['react', '@typescript-eslint'],

	ignorePatterns: ['*.cjs', '*.vue', '*.svelte'],

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
