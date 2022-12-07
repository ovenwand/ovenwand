<script lang="ts">
	import Column from '../../column/Column.svelte';
	import Grid from '../Grid.svelte';
	export let props;
</script>

<Grid {...props} class="bg-color-inverse">
	<Column columns={12} class="bg-color">12</Column>
	<Column columns={2} class="bg-color">2</Column>
	<Column columns={8} class="bg-color">8</Column>
	<Column columns={2} class="bg-color">2</Column>
	<Column columns={12} class="bg-color">12</Column>
</Grid>
