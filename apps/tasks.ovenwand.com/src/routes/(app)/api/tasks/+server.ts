import { json, type RequestEvent } from '@sveltejs/kit';
import { query, mutate } from '$lib/database';
import { CreateTask, DeleteTask, UpdateTask, FindAllTasks } from '$lib/database/queries';
import { mapDataToTask } from '$lib/store/tasks/utils';
import { useTasksChannel } from '$lib/utils/socket/node';

export async function GET() {
	const { errors = null, data } = await query({
		query: FindAllTasks
	});

	return json({
		errors,
		data: {
			tasks: data?.tasks?.data.map(mapDataToTask),
			labels: data?.labels?.data
		}
	});
}

export async function POST({ request }: RequestEvent) {
	const channel = useTasksChannel();
	const body = await request.json();

	const task = {
		title: body.title,
		description: body.description,
		done: body.done,
		labels: body.labels
	};

	const { errors = null, data } = await mutate({
		mutation: CreateTask,
		variables: { data: task }
	});

	if (!errors) {
		await channel.trigger('add', { _id: data._id, ...task });
	}

	return json({
		errors,
		data: null
	});
}

export async function PATCH({ request }: RequestEvent) {
	const channel = useTasksChannel();
	const body = await request.json();

	const task = {
		id: body._id,
		data: {
			title: body.title,
			description: body.description,
			done: body.done,
			schedule: body.schedule,
			size: body.size,
			priority: body.priority,
			businessValue: body.businessValue,
			dueDate: body.dueDate
		}
	};

	const { errors = null, data = null } = await mutate({
		mutation: UpdateTask,
		variables: task
	});

	if (!errors) {
		await channel.trigger('update', { _id: task.id, ...task.data });
	}

	return json({
		errors,
		data
	});
}

export async function DELETE({ request }: RequestEvent) {
	const channel = useTasksChannel();
	const body = await request.json();

	const { errors = null } = await mutate({
		mutation: DeleteTask,
		variables: { id: body._id }
	});

	if (!errors) {
		await channel.trigger('delete', { _id: body._id });
	}

	return json({
		errors,
		data: null
	});
}
