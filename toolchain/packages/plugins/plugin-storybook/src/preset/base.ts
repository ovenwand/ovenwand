import { resolve } from 'node:path';
import { globbySync } from 'globby';

function findStories({ include = [], exclude = [] } = {}) {
	return globbySync([...include, ...exclude.map((pattern) => `!${pattern}`)], {
		cwd: resolve('.storybook')
	});
}

export default {
	stories: findStories({
		// Storybook 7 (storyStoreV7) doesn't support svelte csf yet.. See: https://github.com/storybookjs/storybook/issues/16673
		// include: ["../**/src/**/*.stories.@(mdx|js|ts|jsx|tsx|svelte)"],
		include: ["../**/src/**/*.stories.@(mdx|js|ts|jsx|tsx)"],
		exclude: ["../**/node_modules"]
	}),

	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
};
