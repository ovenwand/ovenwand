<script lang="ts">
	import { useMedia } from '@ovenwand/util.svelte';
	import { Column, Grid } from '@ovenwand/ui';
	import { type ILabel, type ITask, useLabels, useTasks } from './_lib/store';
	import { Task, TaskModal, TaskPool } from './_lib/components';

	export let data: { labels: ILabel[]; tasks: ITask[] } = { labels: [], tasks: [] };

	const { labels } = useLabels(data.labels);
	const { move: moveTask, save: saveTask, tasks } = useTasks(data.tasks);
	const { portrait } = useMedia();

	let archiveLabel: ILabel;
	let nextPool: string = null;
	let currentTask: ITask = null;

	$: archiveLabel = $labels.find((l) => l.name === 'Archive');

	function onTaskClick({ target }: MouseEvent, task: ITask) {
		const excludedElements = ['A', 'SPAN', 'INPUT'];
		const { tagName } = <HTMLElement>target;
		if (!excludedElements.includes(tagName)) {
			currentTask = task;
		}
	}

	function onTaskUpdate(task: ITask, done: boolean) {
		task.done = done;
		saveTask(task);
	}
</script>

<Grid relative class="min-h-full" style={{ 'grid-auto-rows': 'min-content 1fr' }}>
	<Column>
		<TaskModal active={!!currentTask} task={currentTask} />
	</Column>

	{#each $labels.filter((l) => !['Archive', 'Done'].includes(l.name)) as label}
		<Column columns={$portrait ? 12 : 3}>
			<TaskPool
				title={label.name}
				tasks={$tasks.filter((t) => t.labels.includes(label._id))}
				on:dragenter={() => (nextPool = label._id)}
				on:dragleave={() => (nextPool = null)}
				on:drop={() => (nextPool = null)}
				let:task
			>
				<Task
					{...task}
					on:dragend={() => moveTask(task, label._id, nextPool)}
					on:click={(event) => onTaskClick(event, task)}
					on:update={(event) => onTaskUpdate(task, event.detail.done)}
				/>
			</TaskPool>
		</Column>
	{/each}

	<Column>
		<TaskPool
			title={archiveLabel.name}
			tasks={$tasks.filter((t) => t.labels.includes(archiveLabel._id))}
			on:dragenter={() => (nextPool = archiveLabel._id)}
			on:dragleave={() => (nextPool = null)}
			on:drop={() => (nextPool = null)}
			let:task
		>
			<Task
				{...task}
				on:dragend={() => moveTask(task, archiveLabel._id, nextPool)}
				on:click={(event) => onTaskClick(event, task)}
				on:update={(event) => onTaskUpdate(task, event.detail.done)}
			/>
		</TaskPool>
	</Column>
</Grid>
