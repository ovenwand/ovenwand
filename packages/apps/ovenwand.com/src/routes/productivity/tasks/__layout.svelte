<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui.grid';
</script>

<div class="flex min-h-full min-w-full">
	<Grid relative class="flex-auto min-h-full">
		<Column>
			<h1>Task app</h1>
		</Column>

		<Column columns={12}
			><!-- columns required, to calculate pool column size in ./index.svelte -->
			<slot />
		</Column>
	</Grid>
</div>
