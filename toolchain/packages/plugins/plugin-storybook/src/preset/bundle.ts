import { findStories } from '../utils';

export default {
	stories: async (stories = []) => [
		...stories,
		...(await findStories({
			include: ['../../**/packages/**/*.stories.@(mdx|js|ts|jsx|tsx|svelte)'],
			exclude: ['../../**/node_modules']
		}))
	],

	addons: []
};
