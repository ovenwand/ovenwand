import { resolve } from 'node:path';

async function findStories({ include = [], exclude = [] } = {}) {
	const { globby } = await import('globby');

	return await globby([...include, ...exclude.map((pattern) => `!${pattern}`)], {
		cwd: resolve('.storybook')
	});
}

export default {
	stories: async (stories = []) => [...stories, ...await findStories({
		// Storybook 7 (storyStoreV7) doesn't support svelte csf yet.. See: https://github.com/storybookjs/storybook/issues/16673
		// include: ["../**/src/**/*.stories.@(mdx|js|ts|jsx|tsx|svelte)"],
		include: [
			// "../../**/packages/**/*.stories.@(mdx|js|ts|jsx|tsx)",
			"../**/src/**/*.stories.@(mdx|js|ts|jsx|tsx)"
		],
		exclude: ["../**/node_modules"]
	})],

	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
};
