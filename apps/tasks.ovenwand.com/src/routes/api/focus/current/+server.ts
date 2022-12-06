import { json } from '@sveltejs/kit';
import { query } from '$lib/database';
import { FindCurrentTask } from '$lib/database/queries';

export async function GET() {
	const { errors, data } = await query({ query: FindCurrentTask });

	return json({
		errors,
		data: data?.findCurrentTask
	});
}
