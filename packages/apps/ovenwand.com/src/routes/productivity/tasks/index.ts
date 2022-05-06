import type { RequestHandler } from '@sveltejs/kit';
import { gql } from '$database';
import { CreateTask, DeleteTask, UpdateTask, FindAllTasks } from './_lib/store/tasks/queries';

function mapLabelsToId(task) {
	if (!task) {
		return;
	}

	task.labels = task.labels.map((l) => l._id);
	return task;
}

/** @type import('@sveltejs/kit').RequestHandler */
export async function get(): Promise<ReturnType<RequestHandler>> {
	const { errors, data } = await gql(FindAllTasks);

	return {
		body: {
			errors,
			data: {
				tasks: data?.tasks?.data.map(mapLabelsToId),
				labels: data?.labels?.data
			}
		}
	};
}

/** @type import('@sveltejs/kit').RequestHandler */
export async function post({ request }): Promise<ReturnType<RequestHandler>> {
	const body = await request.json();

	const { data, errors } = await gql(CreateTask, {
		data: {
			title: body.title,
			description: body.description,
			done: body.done,
			labels: body.labels
		}
	});

	return {
		body: {
			data: data?.createTask,
			errors
		}
	};
}

/** @type import('@sveltejs/kit').RequestHandler */
export async function patch({ request }): Promise<ReturnType<RequestHandler>> {
	const body = await request.json();

	const { data, errors } = await gql(UpdateTask, {
		id: body._id,
		data: {
			title: body.title,
			description: body.description,
			done: body.done,
			labels: body.labels
		}
	});

	return {
		body: {
			data: mapLabelsToId(data?.updateTask),
			errors
		}
	};
}

/** @type import('@sveltejs/kit').RequestHandler */
export async function del({ request }): Promise<ReturnType<RequestHandler>> {
	const body = await request.json();

	const { data, errors } = await gql(DeleteTask, {
		id: body.id
	});

	return {
		body: {
			data: data?.deleteTask,
			errors
		}
	};
}
