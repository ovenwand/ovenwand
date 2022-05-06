<script lang="ts">
	import { Button } from '@ovenwand/ui.button';
	import { Grid, Column } from '@ovenwand/ui.grid';
	import { Modal } from '@ovenwand/ui.modal';
	import { type ITask, useTasks } from '../store';

	export let task: ITask = null;
	export let active = false;

	const { create: createTask, save: saveTask } = useTasks();

	function onClick() {
		task = createTask({ labels: ['backlog'] });
		active = true;
	}

	function onSubmit() {
		active = false;
		saveTask(task);
	}
</script>

<Button on:click={onClick}>Add task</Button>

<Modal bind:active>
	<form on:submit|preventDefault={onSubmit}>
		<Grid relative>
			<Column>
				<label for="task-title" class="block">Title</label>
				<input
					class="w-full text-gray-900"
					id="task-title"
					name="task.title"
					type="text"
					bind:value={task.title}
					placeholder="title"
				/>
			</Column>

			<Column>
				<label for="task-description" class="block">Description</label>
				<textarea
					class="w-full text-gray-900"
					id="task-description"
					name="task.description"
					type="text"
					bind:value={task.description}
					placeholder="description"
				/>
			</Column>

			<Column>
				<label for="task-labels" class="block">Lane</label>
				<select
					class="w-full text-gray-900"
					id="task-labels"
					name="task.labels"
					bind:value={task.labels}
					multiple
				>
					<option value="backlog" selected={task.labels.includes('backlog')}>Backlog</option>
					<option value="month" selected={task.labels.includes('month')}>Month</option>
					<option value="week" selected={task.labels.includes('week')}>Week</option>
					<option value="day" selected={task.labels.includes('day')}>Day</option>
				</select>
			</Column>

			<Column>
				<Button type="submit">Save</Button>
			</Column>
		</Grid>
	</form>
</Modal>
