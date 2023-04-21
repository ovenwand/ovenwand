import { findStories } from '../utils';

export default {
	stories: async (stories = []) => [
		...stories,
		...(await findStories({
			include: ['../src/**/*.stories.@(mdx|js|ts|jsx|tsx|svelte)'],
			exclude: ['../**/node_modules']
		}))
	],

	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-a11y',
		'@storybook/addon-storysource',
		'@storybook/addon-docs'
	]
};
