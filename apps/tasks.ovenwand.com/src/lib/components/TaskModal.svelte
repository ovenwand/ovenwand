<script lang="ts">
	import { Button, Column, Grid, Modal } from '@ovenwand/ui';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { createTask } from '$lib/database/public/models/tasks/store/utils';
	import { useTasks, type ITask } from '$lib/database';

	export let task: ITask | null = null;
	export let back = null;
	export let active = !!back;

	const tasks = useTasks($page.data.session);

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
		if (task?._id) {
			tasks.mutate.update(task._id, task);
		} else {
			tasks.mutate.create(task);
		}
	}

	function onReset() {
		goBack();
	}

	function onDelete() {
		goBack();
		tasks.mutate.delete(task);
	}
</script>

<Button on:click={onClick}>Add task</Button>

<Modal bind:active {back}>
	<form on:submit|preventDefault={onSubmit} on:reset|preventDefault={onReset}>
		<Grid relative>
			<Column class="flex">
				<div class="flex-grow" />
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

			<Column>
				<Button on:click={onDelete}>Delete</Button>
				<Button type="reset">Cancel</Button>
				<Button type="submit">Save</Button>
			</Column>
		</Grid>
	</form>
</Modal>
