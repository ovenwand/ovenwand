<script lang="ts">
	import { Button, Column, Grid } from '@ovenwand/ui';
</script>

<Grid>
	<Column>
		<form method="POST">
			<input type="text" name="name" />
			<Button type="submit">Create project</Button>
		</form>
	</Column>
</Grid>
