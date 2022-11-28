<script lang="ts">
	import { Button, Column, Grid } from '@ovenwand/ui';
	import { useTasks } from '$lib/store';
	import { Footer, Panel } from '$lib/components';

	export let data: import('./$types').LoadData;

	const { current: getCurrentTask } = useTasks(data.tasks);
	const { currentTask } = getCurrentTask({ fetch });
</script>

<Footer
	links={[
		{ label: '<', columns: 2, anchor: { href: '/' } },
	]}
/>

<Grid relative class="min-h-full">
	<Column>
		<Panel title={$currentTask.title}>
<!--			<svelte:fragment slot="header">-->
<!--				<Button>-->
<!--					Refresh-->
<!--				</Button>-->
<!--			</svelte:fragment>-->

			<h3>Description</h3>
			<p>{$currentTask.description}</p>

			<h3>Notes</h3>
			<pre><code>{JSON.stringify($currentTask, null, '  ')}</code></pre>
		</Panel>
	</Column>
</Grid>
