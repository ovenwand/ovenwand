<script lang="ts">
	import { Button, Column, Grid } from '@ovenwand/ui';
	import { ApplicationState, Footer, Task, TaskPool } from '$lib/components';
	import { type ITask, useTasks } from '$lib/store';

	const { all: getAllTasks } = useTasks();
	const { tasks, loading, cache } = getAllTasks();

	let query = '';

	$: filteredTasks = $tasks.filter(byContent(query));

	function byContent(query) {
		return ({ title, description }: ITask) =>
			JSON.stringify({ title, description }).toLowerCase().includes(query.toLowerCase());
	}
</script>

<ApplicationState busy={$loading} />

<Footer
	links={[
		{ label: '<', columns: 2, anchor: { href: '/' } },
		{ label: 'Schedule', anchor: { href: '/schedule' } },
		{ label: 'Explore', anchor: { href: '/explorer' } }
	]}
/>

<Grid relative class="min-h-full">
	<Column columns={{ md: 4 }}>
		<TaskPool class="h-full" title="Explore" tasks={filteredTasks} let:task>
			<svelte:fragment slot="header">
				<Button>Create...</Button>
			</svelte:fragment>

			<Task placeholder={$loading && !$cache.length} href={`/explorer/${task._id}`} {...task} />

			<svelte:fragment slot="footer">
				<label class="flex">
					<span class="mr-2">Search</span>
					<input type="text" class="flex-grow" bind:value={query} />
				</label>
			</svelte:fragment>
		</TaskPool>
	</Column>
	<Column columns={{ md: 8 }}>
		<slot />
	</Column>
</Grid>
