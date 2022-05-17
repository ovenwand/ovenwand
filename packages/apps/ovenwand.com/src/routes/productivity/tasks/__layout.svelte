<script lang="ts">
	import { Column, Grid, Notifications } from '@ovenwand/ui';
</script>

<Grid class="flex-auto min-h-full" style={{ 'grid-auto-rows': 'min-content 1fr' }}>
	<Column>
		<h1>Task app</h1>
	</Column>

	<Column>
		<slot />
	</Column>
</Grid>

<Notifications />
