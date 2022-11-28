<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui';
	import { useTasks } from '$lib/store';
	import { ApplicationState, Footer, Panel ,Task } from '$lib/components';

	export let data: import('./$types').LoadData;

	const { all: getAllTasks, current: getCurrentTask } = useTasks(data.tasks);
	const { tasks, loading, cache } = getAllTasks();
	const { currentTask } = getCurrentTask({ fetch });

	$: todaysTasks = $tasks;
</script>

<ApplicationState busy={$loading} />

<Footer
	links={[
		{ label: 'Focus', anchor: { href: '/focus' } },
		{ label: 'Schedule', anchor: { href: '/schedule' } },
		{ label: 'Explore', anchor: { href: '/explorer' } },
	]}
/>

<Grid relative class="min-h-full auto-rows-fr">
	<Column columns={{ md: 6 }}>
		<Panel title="Welcome">
			Daily info?<br/>
			- Work or life day?<br/>
			- Travel schedule?<br/>
			- Weather?<br/>
		</Panel>
	</Column>

	<Column columns={{ md: 6 }}>
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
