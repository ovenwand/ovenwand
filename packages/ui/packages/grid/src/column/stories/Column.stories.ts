import Column from '../Column.svelte';
import Template from './Template.svelte';

function getArgs<T extends Record<string, unknown>>(args: T, defaults: T | Record<string, unknown> = {}) {
	return {
		columns: defaults.columns ?? 12,
		offset: defaults.offset ?? 0,
		...args,
	};
}

export default {
	title: 'Components/Grid/Column',

	component: Column,

	argTypes: {
		class: { control: 'text' },
		style: { control: 'text' },
		columns: { control: 'object' },
		offset: { control: 'number' }
	},
}

export const Default = {
	render: (args) => ({
		Component: Template,
		props: { args: getArgs(args) },
	}),
};

export const Columns = {
	render: (args) => ({
		Component: Template,
		props: {
			args: getArgs(args, {
				columns: 6,
			}),
		},
	}),
};

export const Offset = {
	render: (args) => ({
		Component: Template,
		props: {
			args: getArgs(args, {
				columns: 6,
				offset: 6,
			}),
		},
	}),
};