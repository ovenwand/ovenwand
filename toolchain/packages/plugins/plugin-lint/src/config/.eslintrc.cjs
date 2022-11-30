const eslintReactConfig = require('./.eslintrc.react.cjs');
const eslintSvelteConfig = require('./.eslintrc.svelte.cjs');
const eslintVueConfig = require('./.eslintrc.vue.cjs');

module.exports = {
	root: true,

	parser: '@typescript-eslint/parser',

	extends: [
		...eslintReactConfig.extends,
		...eslintVueConfig.extends,
		...eslintSvelteConfig.extends
	],

	plugins: [
		...eslintReactConfig.plugins,
		...eslintVueConfig.plugins,
		...eslintSvelteConfig.plugins
	],

	overrides: [
		// ...eslintReactConfig.overrides,
		// ...eslintVueConfig.overrides,
		...eslintSvelteConfig.overrides
	],

	settings: {
		...eslintReactConfig.settings,
		...eslintVueConfig.settings,
		...eslintSvelteConfig.settings
	},

	parserOptions: {
		...eslintReactConfig.parserOptions,
		...eslintVueConfig.settings,
		...eslintSvelteConfig.settings
	},

	env: {
		...eslintReactConfig.env,
		...eslintVueConfig.env,
		...eslintSvelteConfig.env
	},

	rules: {
		...eslintReactConfig.rules,
		...eslintVueConfig.rules,
		...eslintSvelteConfig.rules
	}
};
