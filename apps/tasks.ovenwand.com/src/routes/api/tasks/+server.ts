import type { RequestEvent } from '@sveltejs/kit';
import { query, mutate } from '$lib/database';
import { CreateTask, DeleteTask, UpdateTask, FindAllTasks } from '$lib/database/queries';
import { mapDataToTask } from '$lib/store/tasks/utils';

export async function GET() {
	const { errors = null, data } = await query({
		query: FindAllTasks
	});

	return new Response(
		JSON.stringify({
			errors,
			data: {
				tasks: data?.tasks?.data.map(mapDataToTask),
				labels: data?.labels?.data
			}
		})
	);
}

export async function POST({ request }: RequestEvent) {
	const body = await request.json();

	const { errors = null, data } = await mutate({
		mutation: CreateTask,
		variables: {
			data: {
				title: body.title,
				description: body.description,
				done: body.done,
				labels: body.labels
			}
		}
	});

	return new Response(
		JSON.stringify({
			errors,
			data: mapDataToTask(data?.createTask?.data)
		})
	);
}

export async function PATCH({ request }: RequestEvent) {
	const body = await request.json();

	const { errors = null, data } = await mutate({
		mutation: UpdateTask,
		variables: {
			id: body._id,
			data: {
				title: body.title,
				description: body.description,
				done: body.done,
				labels: body.labels
			}
		}
	});

	return new Response(
		JSON.stringify({
			errors,
			data: mapDataToTask(data?.updateTask?.data)
		})
	);
}

export async function DELETE({ request }: RequestEvent) {
	const body = await request.json();

	const { errors = null, data } = await mutate({
		mutation: DeleteTask,
		variables: {
			id: body.id
		}
	});

	return new Response(
		JSON.stringify({
			errors,
			data: mapDataToTask(data?.deleteTask?.data)
		})
	);
}
