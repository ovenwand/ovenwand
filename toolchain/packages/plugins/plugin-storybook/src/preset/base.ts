import { findStories } from '../utils';

export default {
	stories: async (stories = []) => [
		...stories,
		...(await findStories({
			// Storybook 7 (storyStoreV7) doesn't support svelte csf yet.. See: https://github.com/storybookjs/storybook/issues/16673
			// include: ["../**/src/**/*.stories.@(mdx|js|ts|jsx|tsx|svelte)"],
			include: ['../src/**/*.stories.@(mdx|js|ts|jsx|tsx)'],
			exclude: ['../**/node_modules']
		}))
	],

	addons: ['@storybook/addon-essentials', '@storybook/addon-a11y']
};
