<script lang="ts">
	import { Column, Grid } from '$lib/components/layout';
</script>

<Grid class="min-h-full">
	<Column>
		<h1>Task app</h1>
	</Column>

	<Column columns={12}>
		<slot />
	</Column>
</Grid>
