<script lang="ts">
	import { Button, Column, Grid } from '@ovenwand/ui';
</script>

<Grid gap={false} gapOutside={false}>
	<Column columns={4}>
		<Button href="/">Schedule</Button>
	</Column>
	<Column columns={4}>
		<Button href="/calendar">Calendar</Button>
	</Column>
	<Column columns={4}>
		<Button href="/tasks">Tasks</Button>
	</Column>
</Grid>
