import Notification from '../Notification.svelte';
import Template from './Default.template.svelte';

function getArgs<T extends Record<string, unknown>>(
	args: T,
	defaults: T | Record<string, unknown> = {}
) {
	return {
		...defaults,
		active: defaults.active ?? true,
		message: defaults.message ?? 'Notification',
		...args
	};
}

export default {
	title: 'Molecules/Notification',

	component: Notification,

	argTypes: {
		id: { control: 'text' },
		class: { control: 'text' },
		// style: { control: 'text' },
		active: { control: 'boolean' },
		message: { control: 'text' }
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

export const Info = {
	render: (args) => ({
		Component: Template,
		props: {
			props: getArgs(args, { type: 'info' })
		}
	})
};

export const Success = {
	render: (args) => ({
		Component: Template,
		props: {
			props: getArgs(args, { type: 'success' })
		}
	})
};

export const Warning = {
	render: (args) => ({
		Component: Template,
		props: {
			props: getArgs(args, { type: 'warn' })
		}
	})
};

export const Error = {
	render: (args) => ({
		Component: Template,
		props: {
			props: getArgs(args, { type: 'error' })
		}
	})
};
