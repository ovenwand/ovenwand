import Modal from '../Modal.svelte';
import Template from './Default.template.svelte';

function getArgs<T extends Record<string, unknown>>(
	args: T,
	defaults: T | Record<string, unknown> = {}
) {
	return {
		...defaults,
		active: defaults.active ?? true,
		...args
	};
}

export default {
	title: 'Molecules/Modal',

	component: Modal,

	argTypes: {
		id: { control: 'text' },
		class: { control: 'text' },
		// style: { control: 'text' },
		active: { control: 'boolean' }
	}
};

export const Default = {
	render: (args) => ({
		Component: Template,
		props: {
			props: getArgs(args),
			slots: { default: args.slot ?? 'Modal' }
		}
	})
};
