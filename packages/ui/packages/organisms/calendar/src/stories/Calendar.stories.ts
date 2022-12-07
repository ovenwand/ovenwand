import Modal from '../Calendar.svelte';
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
	title: 'Organisms/Calendar',

	component: Modal,

	argTypes: {
		date: { control: 'text' },
		today: { control: 'text' },
		previous: { control: 'text' },
		next: { control: 'text' }
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
