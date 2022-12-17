<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui';
	import { useTasks } from '$lib/database';
	import { key, panelTransitions, receive, send } from '$lib/transitions/main-panel';
	import { Panel, FinishTaskButton, SkipTaskButton } from '$lib/components';

	export let data: import('./$types').LoadData;

	$: tasks = useTasks(data?.currentTask);
	$: currentTask = tasks.current;
</script>

<Grid relative class="min-h-full peer peer-[.peer]:absolute peer-[.peer]:top-0">
	<Column class="flex items-center justify-center">
		{#if $currentTask}
			<div class="flex flex-auto min-h-full" in:receive={{ key }} out:send={{ key }}>
				<Panel
					class="flex-auto min-w-full"
					title={$currentTask.title}
					transitions={panelTransitions}
				>
					<svelte:fragment slot="header">
						{#if !$currentTask.done}
							<SkipTaskButton id={$currentTask._id} />
							<FinishTaskButton id={$currentTask._id} />
						{/if}
					</svelte:fragment>

					<h3>Description</h3>
					<p>{$currentTask.description}</p>

					<h3>Notes</h3>
					<pre><code>{JSON.stringify($currentTask, null, '  ')}</code></pre>
				</Panel>
			</div>
		{:else}
			No current task found :)
		{/if}
	</Column>
</Grid>
