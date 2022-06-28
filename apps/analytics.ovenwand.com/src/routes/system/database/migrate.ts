import type { RequestEvent } from '@sveltejs/kit';
import type { FaunaImportMode } from '@ovenwand/services.faunadb';
import { migrate } from '$lib/database';

export async function get({ params }: RequestEvent<{ mode?: FaunaImportMode }>) {
	await migrate(params.mode);

	return {
		status: 200,
		body: {
			data: 'ok'
		}
	};
}
