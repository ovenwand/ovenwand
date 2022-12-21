<script lang="ts">
	import { Button, Column, Grid } from '@ovenwand/ui';
	import { ApplicationState, Footer, Task, TaskPool } from '$lib/components';
	import { useQuery } from '$lib/database';
	import { tasks } from '$lib/models';
	import { route } from '$lib/route';

	const { loading } = useQuery(() => tasks.query.all());

	let query = '';

	$: filteredTasks = $tasks.filter(byContent(query));

	function byContent(query) {
		return ({ title, description }) =>
			JSON.stringify({ title, description }).toLowerCase().includes(query.toLowerCase());
	}
</script>

<ApplicationState busy={$loading} />

<Footer
	links={[
		{ label: '<', columns: 2, anchor: { href: route('/') } },
		{ label: 'Schedule', anchor: { href: route('/schedule') } },
		{ label: 'Explore', anchor: { href: route('/explorer') } }
	]}
/>

<Grid relative class="min-h-full">
	<Column columns={{ md: 4 }}>
		<TaskPool class="h-full" title="Explore" tasks={filteredTasks} loading={$loading} let:task>
			<svelte:fragment slot="header">
				<Button href={route('/explorer/create')}>Create...</Button>
			</svelte:fragment>

			<Task href={route(`/explorer/[id]`, { id: task._id })} {task} />

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
