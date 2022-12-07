module.exports = {
	content: [
		'./src/**/*.{html,js,ts,svelte,vue,jsx,tsx}',
		// TODO figure out a proper solution for specific configurations
		'./.storybook/**/*.{html,js,ts,svelte,vue,ts}',
		'./node_modules/**/@ovenwand/*/src/**/*.{html,js,ts,svelte,vue,jsx,tsx}'
	],

	theme: {
		extend: {}
	},

	plugins: []
};
