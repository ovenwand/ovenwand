<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui';
	import { useTasks } from '$lib/store';
	import { ApplicationState, Task, TaskPool } from '$lib/components';

	const { all: getAllTasks } = useTasks();
	const { tasks, loading, cache } = getAllTasks();
</script>

<ApplicationState busy={$loading} />

<Grid relative class="h-full">
	<Column>
		<TaskPool class="h-full" title="Tasks" tasks={$tasks} let:task>
			<Task placeholder={$loading && !$cache.length} interactive={false} {...task} />
		</TaskPool>
	</Column>
</Grid>
