<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui';
	import { type ITask, useTasks } from '$lib/store';
	import { ApplicationState, Panel, Task, TaskPool } from '$lib/components';

	const { all: getAllTasks, current: getCurrentTask } = useTasks();
	const { tasks, loading, cache } = getAllTasks();
	const { currentTask } = getCurrentTask();

	let query = '';
	let selectedTask = null;

	$: filteredTasks = $tasks.filter(byContent(query));

	function byContent(query) {
		return ({ title, description }: ITask) =>
			JSON.stringify({ title, description })
				.toLowerCase()
				.includes(query.toLowerCase());
	}
</script>

<ApplicationState busy={$loading} />

<Grid relative class="min-h-full">
	<Column columns={{ md: 4 }}>
		<TaskPool class="h-full" title="Explore" tasks={filteredTasks} let:task>
			<Task
				placeholder={$loading && !$cache.length}
				highlight={selectedTask === task}
				{...task}
				on:click={() => selectedTask = task}
			/>
			<svelte:fragment slot="footer">
				<label class="flex">
					<span class="mr-2">Search</span>
					<input type="text" class="flex-grow" bind:value={query} />
				</label>
			</svelte:fragment>
		</TaskPool>
	</Column>
	<Column columns={{ md: 8 }}>
		{@const task = selectedTask ?? $currentTask}

		{#if task}
			<Panel title={task.title}>
				 <p>{task.description}</p>
			</Panel>
	 	{/if}
	</Column>
</Grid>
