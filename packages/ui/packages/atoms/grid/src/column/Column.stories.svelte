<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Grid from '../grid/Grid.svelte';
	import Column from './Column.svelte';
</script>

<Meta
	title="Atoms/Grid/Column"
	components={Column}
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
	<Grid>
		<Column {...args}>
			{JSON.stringify(args.columns ?? 12)} ({JSON.stringify(args.offset ?? 0)})
		</Column>
	</Grid>
</Template>

<Story name="Default" />

<Story name="Columns" args={{ columns: 6 }} />

<Story name="Offset" args={{ columns: 6, offset: 6 }} />

<Story name="Breakpoints" args={{ columns: { md: 6 }, offset: { md: 6 } }} />
