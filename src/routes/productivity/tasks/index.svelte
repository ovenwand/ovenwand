<script lang="ts">
	import { getContext } from 'svelte';
	import { isClient } from '$lib/util';
	import { Column, Grid } from '$lib/components/layout';
	import { moveTask, tasks } from '$modules/tasks/store';
	import { Loader } from '$modules/app/components';
	import { Pool, Task, TaskModal } from '$modules/tasks/components';

	const lanes = ['backlog', 'month', 'week', 'day'];
	let loading = true;
	let nextPool: string = null;

	$: columnSize = getContext('columns');

	if (isClient) {
		const rawStorage = localStorage.getItem('tasks');
		tasks.set(rawStorage ? JSON.parse(rawStorage) : []);
		loading = false;
	}

	$: if (isClient) {
		localStorage.setItem('tasks', JSON.stringify($tasks));
	}
</script>

<Grid relative class="min-h-full">
	<Column>
		<TaskModal />
	</Column>

	{#each lanes as label}
		<Column class="min-h-full" columns={columnSize / lanes.length}>
			<Pool
				title={label}
				on:dragenter={() => (nextPool = label)}
				on:dragleave={() => (nextPool = null)}
			>
				<Loader {loading}>
					{#each $tasks.filter((t) => t.labels.includes(label)) as task}
						<Task
							bind:title={task.title}
							bind:description={task.description}
							bind:done={task.done}
							on:dragend={() => moveTask(task, label, nextPool)}
						/>
					{/each}
				</Loader>
			</Pool>
		</Column>
	{/each}

	<Column>
		<Pool
			title="archive"
			on:dragenter={() => (nextPool = 'archive')}
			on:dragleave={() => (nextPool = null)}
		>
			<Loader {loading}>
				{#each $tasks.filter((t) => t.labels.includes('archive')) as task}
					<Task
						bind:title={task.title}
						bind:description={task.description}
						bind:done={task.done}
						on:dragend={() => moveTask(task, 'archive', nextPool)}
					/>
				{/each}
			</Loader>
		</Pool>
	</Column>
</Grid>
