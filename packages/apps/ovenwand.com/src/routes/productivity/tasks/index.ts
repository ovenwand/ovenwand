import type { RequestHandler } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/private';
import { gql } from '@ovenwand/services.faunadb';
import type { ILabel, ITask } from './_lib/store';
import { CreateTask, DeleteTask, UpdateTask, FindAllTasks } from './_lib/store/tasks/queries';

type Data<T> = { data: T };

function mapLabelsToId(obj?: Omit<ITask, 'labels'> & { labels: ILabel[] }): ITask {
	let task: ITask;

	if (obj) {
		task = {
			...obj,
			labels: obj.labels.map((l) => l._id)
		};
	}

	return task;
}

/** @type import('./index.ts').RequestHandler */
export async function get(): Promise<ReturnType<RequestHandler>> {
	const { errors, data } = await gql<{ tasks: Data<ITask[]>; labels: Data<ILabel[]> }>(
		FindAllTasks
	);

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

/** @type import('./index.ts').RequestHandler */
export async function post({ request }: RequestEvent): Promise<ReturnType<RequestHandler>> {
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

/** @type import('./index.ts').RequestHandler */
export async function patch({ request }: RequestEvent): Promise<ReturnType<RequestHandler>> {
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

/** @type import('./index.ts').RequestHandler */
export async function del({ request }: RequestEvent): Promise<ReturnType<RequestHandler>> {
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
