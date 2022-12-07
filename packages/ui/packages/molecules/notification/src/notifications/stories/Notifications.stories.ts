import Notifications from '../Notifications.svelte';
import Template from './Default.template.svelte';

function getArgs<T extends Record<string, unknown>>(
	args: T,
	defaults: T | Record<string, unknown> = {}
) {
	return {
		...defaults,
		...args
	};
}

export default {
	title: 'Molecules/Notifications',

	component: Notifications,

	argTypes: {
		id: { control: 'text' },
		class: { control: 'text' },
		top: { control: 'boolean' },
		right: { control: 'boolean' },
		bottom: { control: 'boolean' },
		left: { control: 'boolean' }
		// style: { control: 'text' },
	}
};

export const Default = {
	render: (args) => ({
		Component: Template,
		props: {
			props: getArgs(args)
		}
	})
};
