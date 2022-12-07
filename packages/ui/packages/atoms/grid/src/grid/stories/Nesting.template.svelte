<script lang="ts">
	import Column from '../../column/Column.svelte';
	import Grid from '../Grid.svelte';
	export let props;
</script>

<Grid class="bg-color-inverse" {...props}>
	<Column class="bg-color" columns={6}>6</Column>
	<Column class="bg-color" columns={6}>
		<Grid class="bg-color-inverse" relative>
			<Column class="bg-color" columns={3}>3</Column>
			<Column class="bg-color" columns={3}>3</Column>
		</Grid>
	</Column>
</Grid>
