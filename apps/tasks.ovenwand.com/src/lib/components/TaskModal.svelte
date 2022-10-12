<script lang="ts">
	import { Button, Column, Grid, Modal } from '@ovenwand/ui';
	import { goto } from '$app/navigation';
	import { type ITask, useLabels, useTasks } from '../store';

	export let task: ITask = null;
	export let back = null;
	export let active = !!back;

	const { labels } = useLabels();
	const { create: createTask, save: saveTask, delete: deleteTask } = useTasks();

	function goBack() {
		if (back) {
			goto(back);
		} else {
			active = false;
		}
	}

	function onClick() {
		task = createTask();
		active = true;
	}

	function onSubmit() {
		goBack();
		saveTask(task);
	}

	function onReset() {
		goBack();
	}

	function onDelete() {
		goBack();
		deleteTask(task);
	}
</script>

<Button on:click={onClick}>Add task</Button>

<Modal bind:active {back}>
	<form on:submit|preventDefault={onSubmit} on:reset|preventDefault={onReset}>
		<Grid relative>
			<Column class="flex">
				<div class="flex-grow"/>
				<Button href={back} title="close">Close</Button>
			</Column>

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

<!--			<Column>-->
<!--				<label for="task-labels" class="block">Lane</label>-->
<!--				<select-->
<!--					class="w-full text-gray-900"-->
<!--					id="task-labels"-->
<!--					name="task.labels"-->
<!--					bind:value={task.labels}-->
<!--					multiple-->
<!--				>-->
<!--					{#each $labels as label (label._id)}-->
<!--						<option value={label._id} selected={task.labels.includes(label._id)}>-->
<!--							{label.name}-->
<!--						</option>-->
<!--					{/each}-->
<!--				</select>-->
<!--			</Column>-->

			<Column>
				<Button on:click={onDelete}>Delete</Button>
				<Button type="reset">Cancel</Button>
				<Button type="submit">Save</Button>
			</Column>
		</Grid>
	</form>
</Modal>
