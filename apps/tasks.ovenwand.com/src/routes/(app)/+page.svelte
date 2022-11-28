<script lang="ts">
	import { Button, Column, Grid } from '@ovenwand/ui';
	import { useTasks } from '$lib/store';
	import { ApplicationState, Panel ,Task } from '$lib/components';

	export let data: import('./$types').LoadData;

	const { all: getAllTasks, current: getCurrentTask } = useTasks(data.tasks);
	const { tasks, loading, cache } = getAllTasks();
	const { currentTask } = getCurrentTask({ fetch });

	$: todaysTasks = $tasks;
</script>

<ApplicationState busy={$loading} />

<Grid relative class="min-h-full auto-rows-[50%_50%_100%] md:auto-rows-fr">
	<Column columns={{ md: 6 }}>
		<Panel title="Welcome">
			Daily info?<br/>
			- Work or life day?<br/>
			- Travel schedule?<br/>
			- Weather?<br/>
		</Panel>
	</Column>

	<Column columns={{ md: 6 }}>
		<Panel title="Focus">
			<svelte:fragment slot="header">
				<Button>
					Refresh
				</Button>
			</svelte:fragment>

			<h3>{$currentTask.title}</h3>
			<p>{$currentTask.description}</p>
		</Panel>
	</Column>

	<Column>
		<Panel title="Daily focus">
			{#each todaysTasks as task}
				<Task
					placeholder={$loading && !$cache.length}
					interactive={false}
					href={`/explorer/${task._id}`}
					{...task}
				/>
			{/each}
		</Panel>
	</Column>
</Grid>
