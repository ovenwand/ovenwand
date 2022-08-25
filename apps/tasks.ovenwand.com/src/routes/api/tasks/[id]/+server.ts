import type { RequestEvent } from '@sveltejs/kit';
import { query } from '$lib/database';
import { FindTaskById } from '$lib/database/queries';
import { mapDataToTask } from '$lib/store/tasks/utils';

export async function GET({ params }: RequestEvent<{ id: string }>) {
	const { errors, data } = await query({
		query: FindTaskById,
		variables: { id: params.id }
	});

	return new Response(
		JSON.stringify({
			errors,
			data: {
				task: mapDataToTask(data?.findTaskByID)
			}
		})
	);
}
