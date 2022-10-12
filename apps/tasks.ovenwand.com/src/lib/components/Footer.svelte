<script lang="ts">
	import { Button, Column, Grid } from '@ovenwand/ui';
</script>

<Grid class="bg-gray-300 dark:bg-gray-900 drop-shadow" gap={false} gapOutside={false}>
	<Column columns={4}>
		<Button full size="large" href="/schedule">Schedule</Button>
	</Column>
	<Column columns={4}>
		<Button full size="large" href="/">Focus</Button>
	</Column>
	<Column columns={4}>
		<Button full size="large" href="/explorer">Explorer</Button>
	</Column>
</Grid>
