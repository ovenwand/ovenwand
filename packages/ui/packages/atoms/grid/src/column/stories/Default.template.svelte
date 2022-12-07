<script lang="ts">
	import Grid from '../../grid/Grid.svelte';
	import Column from '../Column.svelte';
	export let props;
</script>

<Grid>
	<Column {...props}>
		{JSON.stringify(props.columns)} ({JSON.stringify(props.offset)})
	</Column>
</Grid>
