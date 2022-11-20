export default {
	refs: async () => {
		// TODO dynamically find storybook instances and determine title and url
		const refs = {
			toolchain: {
				title: 'Toolchain',
				url: 'http://toolchain.docs.ovenwand.wtf:6007',
			},
			'user-interface': {
				title: 'User Interface',
				url: 'http://ui.docs.ovenwand.wtf:6008',
			},
		};

		return refs;
	},
}
