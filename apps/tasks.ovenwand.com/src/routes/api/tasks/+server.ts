import type { RequestEvent } from '@sveltejs/kit';
import type { Data } from '@ovenwand/services.faunadb';
import type { ILabelData, ITaskData } from '$lib/store';
import { gql } from '$lib/database';
import { CreateTask, DeleteTask, UpdateTask, FindAllTasks } from '$lib/database/queries';
import { mapDataToTask } from '$lib/store/tasks/utils';

export async function GET() {
	const { errors, data } = await gql<{ tasks: Data<ITaskData[]>; labels: Data<ILabelData[]> }>(
		FindAllTasks
	);

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

	const { data, errors } = await gql<{ createTask: Data<ITaskData> }>(CreateTask, {
		data: {
			title: body.title,
			description: body.description,
			done: body.done,
			labels: body.labels
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

	const { data, errors } = await gql<{ updateTask: Data<ITaskData> }>(UpdateTask, {
		id: body._id,
		data: {
			title: body.title,
			description: body.description,
			done: body.done,
			labels: body.labels
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

	const { data, errors } = await gql<{ deleteTask: Data<ITaskData> }>(DeleteTask, {
		id: body.id
	});

	return new Response(
		JSON.stringify({
			errors,
			data: mapDataToTask(data?.deleteTask?.data)
		})
	);
}
