import { resolve } from 'node:path';

export async function findStories({ include = [], exclude = [] } = {}) {
	const { globby } = await import('globby');

	return await globby([...include, ...exclude.map((pattern) => `!${pattern}`)], {
		cwd: resolve('.storybook')
	});
}
