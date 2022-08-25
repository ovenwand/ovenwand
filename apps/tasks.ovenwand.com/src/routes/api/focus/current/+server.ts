import { json } from '@sveltejs/kit';
import { query } from '$lib/database';
import { FindCurrentTask } from '$lib/database/queries';
import { mapDataToTask } from '$lib/store/tasks/utils';

export async function GET() {
	const { errors, data } = await query({ query: FindCurrentTask });

	return json({
		errors,
		data: mapDataToTask(data?.findCurrentTask)
	});
}
