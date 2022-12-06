import { json, type RequestEvent } from '@sveltejs/kit';
import { query } from '$lib/database';
import { FindTaskById } from '$lib/database/queries';

export async function GET({ params }: RequestEvent<{ id: string }>) {
	const { errors, data } = await query({
		query: FindTaskById,
		variables: { id: params.id }
	});

	return json({
		errors,
		data: data?.findTaskByID
	});
}
