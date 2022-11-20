<script lang="ts">
	import Grid from '../../grid/Grid.svelte';
	import Column from '../Column.svelte';
	export let args;
</script>

<Grid class="bg-color-inverse" relative>
	<Column class="bg-color" {...args}>{JSON.stringify(args.columns)} ({args.offset})</Column>
</Grid>
