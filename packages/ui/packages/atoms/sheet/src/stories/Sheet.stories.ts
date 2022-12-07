import Sheet from '../Sheet.svelte';
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
	title: 'Atoms/Sheet',

	component: Sheet,

	argTypes: {
		id: { control: 'text' },
		class: { control: 'text' },
		// style: { control: 'text' },
		padding: { control: 'boolean' },
		rounded: { control: 'boolean' },
		shadow: { control: 'boolean' },
		background: { control: 'boolean' }
	}
};

export const Default = {
	render: (args) => ({
		Component: Template,
		props: {
			props: getArgs(args),
			slots: { default: args.slot ?? 'Sheet' }
		}
	})
};

export const Background = {
	render: (args) => ({
		Component: Template,
		props: {
			props: getArgs(args, { background: true }),
			slots: { default: args.slot ?? 'Sheet' }
		}
	})
};

export const Padding = {
	render: (args) => ({
		Component: Template,
		props: {
			props: getArgs(args, { background: true, padding: true }),
			slots: { default: args.slot ?? 'Sheet' }
		}
	})
};

export const RoundedCorners = {
	render: (args) => ({
		Component: Template,
		props: {
			props: getArgs(args, { background: true, rounded: true }),
			slots: { default: args.slot ?? 'Sheet' }
		}
	})
};

export const Raised = {
	render: (args) => ({
		Component: Template,
		props: {
			props: getArgs(args, { background: true, shadow: true }),
			slots: { default: args.slot ?? 'Sheet' }
		}
	})
};
