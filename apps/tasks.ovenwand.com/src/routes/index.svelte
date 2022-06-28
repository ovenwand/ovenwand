<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui';
	import { type ILabel, type ITask, useTasks } from '$lib/store';
	import { Task, TaskPool } from '$lib/components';

	export let data: { labels: ILabel[]; tasks: ITask[] } = { labels: [], tasks: [] };

	const { tasks } = useTasks(data.tasks);
</script>

<Grid relative class="h-full">
	<Column>
		<TaskPool class="h-full" title="Tasks" tasks={$tasks} let:task>
			<Task interactive={false} {...task} />
		</TaskPool>
	</Column>
</Grid>
