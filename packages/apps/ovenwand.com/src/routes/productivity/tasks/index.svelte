<script lang="ts">
	import { useMedia } from '@ovenwand/util.svelte';
	import { Column, Grid } from '@ovenwand/ui.grid';
	import { type ITask, useTasks } from './_lib/store';
	import { Task, TaskModal, TaskPool } from './_lib/components';

	const { move: moveTask, save: saveTask, tasks } = useTasks();
	const { portrait } = useMedia();
	const lanes = ['backlog', 'month', 'week', 'day'];
	let nextPool: string = null;
	let currentTask: ITask = null;

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

	{#each lanes as label}
		<Column class="min-h-full" columns={$portrait ? 12 : 3}>
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
