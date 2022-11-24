export default {
	refs: async (config, { configType }) => {
		const isDevelopment = configType === 'DEVELOPMENT';

		// TODO dynamically find storybook instances and determine title and url
		return {
			toolchain: {
				title: 'Toolchain',
				url: isDevelopment
					? 'http://toolchain.docs.ovenwand.wtf:6007'
					: 'https://toolchain.docs.ovenwand.com',
			},
			'user-interface': {
				title: 'User Interface',
				url: isDevelopment
					? 'http://ui.docs.ovenwand.wtf:6008'
					: 'https://ui.docs.ovenwand.com',
			},
		};
	},
}
