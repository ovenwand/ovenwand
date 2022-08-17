<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui';
	import { page } from '$app/stores';
</script>

<Grid>
	<Column columns={{ md: 8 }} offset={{ md: 2 }}>
		<h1>{$page.error.status}</h1>
		<h3>{$page.error.message}</h3>
	</Column>
</Grid>
