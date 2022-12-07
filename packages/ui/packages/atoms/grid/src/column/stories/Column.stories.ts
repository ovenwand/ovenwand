import Column from '../Column.svelte';
import Template from './Default.template.svelte';

function getArgs<T extends Record<string, unknown>>(
	args: T,
	defaults: T | Record<string, unknown> = {}
) {
	return {
		...defaults,
		columns: defaults.columns ?? { xs: null, sm: null, md: null, lg: null, xl: null },
		offset: defaults.offset ?? { xs: null, sm: null, md: null, lg: null, xl: null },
		...args
	};
}

export default {
	title: 'Atoms/Grid/Column',

	component: Column,

	argTypes: {
		columns: { control: 'object' },
		offset: { control: 'object' }
	}
};

export const Default = {
	render: (args) => ({
		Component: Template,
		props: { props: getArgs(args) }
	})
};

export const Columns = {
	render: (args) => ({
		Component: Template,
		props: { props: getArgs(args, { columns: 6 }) }
	})
};

export const Offset = {
	render: (args) => ({
		Component: Template,
		props: { props: getArgs(args, { columns: 6, offset: 6 }) }
	})
};

export const Breakpoints = {
	render: (args) => ({
		Component: Template,
		props: {
			props: getArgs(args, { columns: { md: 6 }, offset: { md: 3 } })
		}
	})
};
