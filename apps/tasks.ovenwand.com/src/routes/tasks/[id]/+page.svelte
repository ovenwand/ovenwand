<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui';
	import { TaskPool } from '$lib/components';
	import { type ITask, useTask } from '$lib/store';

	export let data: { task: ITask };
	const { task } = useTask(data.task);
</script>

<Grid relative class="h-full">
	<Column>
		<TaskPool class="h-full" title={task.title} tasks={[task]} let:task>
			<h2>{task.description}</h2>
		</TaskPool>
	</Column>
</Grid>
