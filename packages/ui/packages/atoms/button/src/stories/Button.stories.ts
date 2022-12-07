import Button from '../Button.svelte';
import Template from './Default.template.svelte';

function getArgs<T extends Record<string, unknown>>(
	args: T,
	defaults: T | Record<string, unknown> = {}
) {
	return {
		type: defaults.type ?? 'button',
		size: defaults.type ?? 'default',
		...defaults,
		...args
	};
}

export default {
	title: 'Atoms/Button',

	component: Button,

	argTypes: {
		slot: { control: 'text' },
		// class: { control: 'text' },
		// style: { control: 'text' },
		href: { control: 'text' },
		type: { control: 'text' },
		size: { control: 'radio', options: ['default', 'large'] },
		full: { control: 'boolean' }
	}
};

export const Default = {
	render: (args) => ({
		Component: Template,
		props: {
			props: getArgs(args),
			slots: { default: args.slot ?? 'Button' }
		}
	})
};

export const Large = {
	render: (args) => ({
		Component: Template,
		props: {
			props: getArgs(args, { size: 'large' }),
			slots: { default: args.slot ?? 'Button' }
		}
	})
};
