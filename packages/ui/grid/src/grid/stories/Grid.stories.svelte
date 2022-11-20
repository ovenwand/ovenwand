<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Grid from '../Grid.svelte';
	import Column from './Column.svelte';

	const argTypes = {
		relative: {
			control: { type: 'boolean' },
			defaultValue: false
		},
		gap: {
			control: { type: 'boolean' },
			defaultValue: true
		},
		gapOutside: {
			control: { type: 'boolean' },
			defaultValue: true
		},
		class: {
			control: { type: 'text' }
		},
		style: {
			control: { type: 'object' }
		}
	};
</script>

<Meta title="Library/Layout/Grid" parameters={{ layout: 'fullscreen' }} {argTypes} />

<Template let:args>
	<Grid {...args} class="bg-color-inverse">
		<Column columns={12} class="bg-color">12</Column>
		<Column columns={2} class="bg-color">2</Column>
		<Column columns={8} class="bg-color">8</Column>
		<Column columns={2} class="bg-color">2</Column>
		<Column columns={12} class="bg-color">12</Column>
	</Grid>
</Template>

<Story name="Default" />

<Story name="Relative">
	<Grid relative class="bg-color-inverse">
		<Column columns={12} class="bg-color">12</Column>
		<Column columns={2} class="bg-color">2</Column>
		<Column columns={8} class="bg-color">8</Column>
		<Column columns={2} class="bg-color">2</Column>
		<Column columns={12} class="bg-color">12</Column>
	</Grid>
</Story>

<Story name="Nesting">
	<Grid class="bg-color-inverse">
		<Column class="bg-color" columns={6}>6</Column>
		<Column class="bg-color" columns={6}>
			<Grid class="bg-color-inverse" relative>
				<Column class="bg-color" columns={3}>3</Column>
				<Column class="bg-color" columns={3}>3</Column>
			</Grid>
		</Column>
	</Grid>
</Story>
