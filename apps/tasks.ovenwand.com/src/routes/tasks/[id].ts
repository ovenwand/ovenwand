import type { RequestEvent, RequestHandlerOutput } from '@sveltejs/kit';
import type { Errors, Data } from '@ovenwand/services.faunadb';
import { gql } from '$lib/database';
import { FindTaskById } from '$lib/database/queries';
import type { ITask, ITaskData } from '$lib/store';
import { mapDataToTask } from '$lib/store/tasks/utils';

export interface GetTaskResponseBody {
	task: ITask;
}
export async function GET({
	params
}: RequestEvent<{ id: string }>): Promise<
	RequestHandlerOutput<Errors & Data<GetTaskResponseBody>>
> {
	const { errors, data } = await gql<{ findTaskByID: ITaskData }>(FindTaskById, { id: params.id });

	return {
		body: {
			errors,
			data: {
				task: mapDataToTask(data?.findTaskByID)
			}
		}
	};
}
