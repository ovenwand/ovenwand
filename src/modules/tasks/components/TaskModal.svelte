<script lang="ts">
	import { Grid, Column } from '$lib/components/layout';
	import { Modal } from '$lib/components/modal';
	import type { ITask } from '../store';
	import { addTask, createTask } from '../store';

	export let task: ITask = createTask({ labels: ['backlog'] });
	export let active = false;

	function onSubmit() {
		active = false;
		addTask(task);
	}
</script>

<button on:click={() => (active = true)}> Add task </button>

<Modal bind:active>
	<form on:submit|preventDefault={onSubmit}>
		<Grid>
			<Column>
				<label class="block">Title</label>
				<input
					class="w-full text-gray-900"
					type="text"
					bind:value={task.title}
					placeholder="title"
				/>
			</Column>

			<Column>
				<label class="block">Description</label>
				<input
					class="w-full text-gray-900"
					type="text"
					bind:value={task.description}
					placeholder="description"
				/>
			</Column>

			<Column>
				<label class="block">Lane</label>
				<select class="w-full text-gray-900">
					<option value="backlog" selected={task.labels.includes('backlog')}>Backlog</option>
					<option value="month" selected={task.labels.includes('month')}>Month</option>
					<option value="week" selected={task.labels.includes('week')}>Week</option>
					<option value="day" selected={task.labels.includes('day')}>Day</option>
				</select>
			</Column>

			<Column>
				<button type="submit"> Save </button>
			</Column>
		</Grid>
	</form>
</Modal>
