<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui';
	import { type ILabel, type ITask, useTasks } from '$lib/store';
	import { Task, TaskPool } from '$lib/components';

	export let data: { labels: ILabel[]; tasks: ITask[] } = { labels: [], tasks: [] };

	const { tasks } = useTasks(data.tasks);

	let query = '';

	$: filteredTasks = $tasks.filter(byTitle(query));

	function byTitle(query) {
		return ({ title }: ITask) => JSON.stringify({ title }).includes(query);
	}
</script>

<Grid relative class="h-full">
	<Column>
		<TaskPool class="h-full" title="Tasks" tasks={filteredTasks} let:task>
			<Task interactive={false} {...task} />

			<svelte:fragment slot="footer">
				<label class="flex">
					<span class="mr-2">Search</span>
					<input type="text" class="flex-grow" bind:value={query} />
				</label>
			</svelte:fragment>
		</TaskPool>
	</Column>
</Grid>
