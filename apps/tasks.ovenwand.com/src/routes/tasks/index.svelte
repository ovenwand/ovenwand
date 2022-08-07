<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui';
	import { type ITask, useTasks } from '$lib/store';
	import { ApplicationState, Task, TaskPool } from '$lib/components';

	const { all: getAllTasks } = useTasks();
	const { tasks, loading, cache } = getAllTasks();

	let query = '';

	$: filteredTasks = $tasks.filter(byTitle(query));

	function byTitle(query) {
		return ({ title }: ITask) => JSON.stringify({ title }).includes(query);
	}
</script>

<ApplicationState busy={$loading} />

<Grid relative class="h-full">
	<Column>
		<TaskPool class="h-full" title="Tasks" tasks={filteredTasks} let:task>
			<Task placeholder={$loading && !$cache.length} interactive={false} {...task} />
			<svelte:fragment slot="footer">
				<label class="flex">
					<span class="mr-2">Search</span>
					<input type="text" class="flex-grow" bind:value={query} />
				</label>
			</svelte:fragment>
		</TaskPool>
	</Column>
</Grid>
