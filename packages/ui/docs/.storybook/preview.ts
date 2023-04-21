import './preview.css';

export const parameters = {
	layout: 'centered',
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/i
		}
	},
	options: {
		storySort: {
			order: ['Atoms', 'Molecules', 'Organisms']
		}
	}
};
