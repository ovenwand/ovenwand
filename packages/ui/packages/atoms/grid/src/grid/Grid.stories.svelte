<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Column from '../column/Column.svelte';
	import Grid from './Grid.svelte';
</script>

<Meta
	title="Atoms/Grid/Grid2"
	component={Grid}
	parameters={{
		layout: 'fullscreen',
		docs: {
			story: {
				inline: false
			}
		}
	}}
/>

<Template let:args>
	<Grid {...args}>
		<Column columns={12}>12</Column>
		<Column columns={2}>2</Column>
		<Column columns={8}>8</Column>
		<Column columns={2}>2</Column>
		<Column columns={12}>12</Column>
	</Grid>
</Template>

<Story name="Default" />

<Story name="Relative" args={{ relative: true }} />

<Story name="Nesting">
	<Grid>
		<Column columns={6}>6</Column>
		<Column columns={6}>
			<Grid>
				<Column columns={3}>3</Column>
				<Column columns={3}>3</Column>
			</Grid>
		</Column>
	</Grid>
</Story>
