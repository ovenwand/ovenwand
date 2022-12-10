<script lang="ts">
	import { Button, Column, Grid } from '@ovenwand/ui';
	import { useTasks } from '$lib/database';
	import { Footer, Panel } from '$lib/components';

	export let data: import('./$types').LoadData;

	$: tasks = useTasks(data?.tasks);
	$: currentTask = tasks.current;
</script>

<Footer links={[{ label: '<', columns: 2, anchor: { href: '/' } }]} />

<Grid relative class="min-h-full">
	<Column>
		{#if $currentTask}
			<Panel title={$currentTask.title}>
				<svelte:fragment slot="header">
					{#if !$currentTask.done}
						<form method="POST" action="?/markSkipped">
							<input type="hidden" name="id" value={$currentTask._id} />
							<Button type="submit">Skip</Button>
						</form>
					{/if}
					{#if !$currentTask.done}
						<form method="POST" action="?/markDone">
							<input type="hidden" name="id" value={$currentTask._id} />
							<Button type="submit">Done</Button>
						</form>
					{/if}
				</svelte:fragment>

				<h3>Description</h3>
				<p>{$currentTask.description}</p>

				<h3>Notes</h3>
				<pre><code>{JSON.stringify($currentTask, null, '  ')}</code></pre>
			</Panel>
		{:else}
			No current task found :)
		{/if}
	</Column>
</Grid>
