<script lang="ts">
	import { getContext } from 'svelte';
	import { isClient } from '@ovenwand/util.browser';
	import { useMedia } from '@ovenwand/util.svelte';
	import { Column, Grid } from '@ovenwand/ui.grid';
	import type { ITask } from './_lib/store';
	import { moveTask, saveTask, tasks } from './_lib/store';
	import { Task, TaskModal, TaskPool } from './_lib/components';

	const { xs, sm } = useMedia();
	const lanes = ['backlog', 'month', 'week', 'day'];
	let loading = true;
	let nextPool: string = null;
	let currentTask: ITask = null;
	let columnSize: number;

	$: columnSize = getContext('columns');

	if (isClient) {
		loading = false;
	}

	function onTaskClick({ target }, task) {
		if (!['A', 'INPUT'].includes(target.tagName)) {
			currentTask = task;
		}
	}

	function onTaskUpdate(task, done) {
		task.done = done;
		saveTask(task);
	}
</script>

<Grid relative class="min-h-full">
	<Column>
		<TaskModal active={!!currentTask} task={currentTask} />
	</Column>

	{#each lanes as label}
		<Column class="min-h-full" columns={$xs || $sm ? columnSize : columnSize / lanes.length}>
			<TaskPool
				title={label}
				tasks={$tasks.filter((t) => t.labels.includes(label))}
				on:dragenter={() => (nextPool = label)}
				on:dragleave={() => (nextPool = null)}
				on:drop={() => (nextPool = null)}
				let:task
			>
				<Task
					{...task}
					on:dragend={() => moveTask(task, label, nextPool)}
					on:click={(event) => onTaskClick(event, task)}
					on:update={(event) => onTaskUpdate(task, event.detail.done)}
				/>
			</TaskPool>
		</Column>
	{/each}

	<Column>
		<TaskPool
			title="archive"
			tasks={$tasks.filter((t) => t.labels.includes('archive'))}
			on:dragenter={() => (nextPool = 'archive')}
			on:dragleave={() => (nextPool = null)}
			on:drop={() => (nextPool = null)}
			let:task
		>
			<Task
				{...task}
				on:dragend={() => moveTask(task, 'archive', nextPool)}
				on:click={(event) => onTaskClick(event, task)}
			/>
		</TaskPool>
	</Column>
</Grid>
