import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit';
import { gql, type Data, type Errors } from '@ovenwand/services.faunadb';
import type { ILabel, ILabelData, ITask, ITaskData } from '$lib/store';
import { CreateTask, DeleteTask, UpdateTask, FindAllTasks } from '$lib/database/queries';
import { mapDataToTask } from '$lib/store/tasks/utils';

export interface GetResponseBody {
	tasks: ITask[];
	labels: ILabel[];
}
export async function GET(): Promise<RequestHandlerOutput<Errors & Data<GetResponseBody>>> {
	const { errors, data } = await gql<{ tasks: Data<ITaskData[]>; labels: Data<ILabelData[]> }>(
		FindAllTasks
	);

	return {
		body: {
			errors,
			data: {
				tasks: data?.tasks?.data.map(mapDataToTask),
				labels: data?.labels?.data
			}
		}
	};
}

export async function POST({
	request
}: RequestEvent): Promise<RequestHandlerOutput<Errors & Data<ITask>>> {
	const body = await request.json();

	const { data, errors } = await gql<{ createTask: Data<ITaskData> }>(CreateTask, {
		data: {
			title: body.title,
			description: body.description,
			done: body.done,
			labels: body.labels
		}
	});

	return {
		body: {
			errors,
			data: data?.createTask?.data
		}
	};
}

export async function PATCH({
	request
}: RequestEvent): Promise<RequestHandlerOutput<Errors & Data<ITask>>> {
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

	return {
		body: {
			errors,
			data: data?.updateTask?.data
		}
	};
}

export async function DELETE({
	request
}: RequestEvent): Promise<RequestHandlerOutput<Errors & Data<ITask>>> {
	const body = await request.json();

	const { data, errors } = await gql<{ deleteTask: Data<ITaskData> }>(DeleteTask, {
		id: body.id
	});

	return {
		body: {
			errors,
			data: data?.deleteTask?.data
		}
	};
}
