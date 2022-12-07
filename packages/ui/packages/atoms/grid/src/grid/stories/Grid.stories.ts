import Grid from '../Grid.svelte';
import Template from './Default.template.svelte';
import NestingTemplate from './Nesting.template.svelte';

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
	title: 'Atoms/Grid/Grid',

	component: Grid,

	argTypes: {
		relative: { control: 'boolean' },
		gap: { control: 'boolean' },
		gapOutside: { control: 'boolean' },
		class: { control: 'text' },
		style: { control: 'object' }
	}
};

export const Default = {
	render: (args) => ({
		Component: Template,
		props: { props: getArgs(args) }
	})
};

export const Relative = {
	render: (args) => ({
		Component: Template,
		props: { props: getArgs(args, { relative: true }) }
	})
};

export const Nesting = {
	render: (args) => ({
		Component: NestingTemplate,
		props: { props: getArgs(args) }
	})
};
