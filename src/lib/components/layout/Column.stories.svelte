<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { Column, Grid } from '$lib/components/layout';

	const argTypes = {
		columns: {
			control: { type: 'object' }
		},
		offset: {
			control: { type: 'number' }
		}
	};
</script>

<Meta {argTypes} title="Library/Layout/Column" parameters={{ layout: 'fullscreen' }} />

<Template let:args>
	<Grid class="bg-color-inverse" relative>
		<Column class="bg-color" {...args}>{args.columns || 12}</Column>
	</Grid>
</Template>

<Template id="breakpoints" let:args>
	<Grid class="bg-color-inverse" relative>
		<Column class="bg-color" {...args}>{JSON.stringify(args.columns)}</Column>
	</Grid>
</Template>

<Story name="Default" />

<Story name="Columns" args={{ columns: 6 }} />

<Story name="Offset" args={{ columns: 6, offset: 6 }} />

<Story name="Breakpoints" template="breakpoints" args={{ columns: { md: 6 } }} />
