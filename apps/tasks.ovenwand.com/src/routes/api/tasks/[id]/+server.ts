import type { RequestEvent } from '@sveltejs/kit';
import { gql } from '$lib/database';
import { FindTaskById } from '$lib/database/queries';
import type { ITaskData } from '$lib/store';
import { mapDataToTask } from '$lib/store/tasks/utils';

export async function GET({ params }: RequestEvent<{ id: string }>) {
	const { errors, data } = await gql<{ findTaskByID: ITaskData }>(FindTaskById, { id: params.id });

	return new Response(
		JSON.stringify({
			errors,
			data: {
				task: mapDataToTask(data?.findTaskByID)
			}
		})
	);
}
