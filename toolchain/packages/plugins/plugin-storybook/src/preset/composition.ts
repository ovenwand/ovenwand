import { env } from 'node:process';

export default {
	refs: async () => {
		// TODO dynamically find storybook instances and determine title and url, instead of using env variables
		// we could automatically detect instances based on the filesystem for example
		return env.TOOLCHAIN_STORYBOOK_INSTANCES.split('\n').reduce((storybooks, entry) => {
			const [name, url] = entry.split(',');
			const key = name.toLowerCase().replace(' ', '-');
			storybooks[key] = { name, url };
			return storybooks;
		}, {});
	}
};
