import type { RequestEvent } from '@sveltejs/kit';
import type { FaunaImportMode } from '@ovenwand/services.faunadb';
import { migrate } from '$lib/database';

export async function get({ params, locals }: RequestEvent<{ mode?: FaunaImportMode }>) {
	await migrate(params.mode || 'merge', locals.token);

	return {
		status: 200,
		body: {
			data: 'ok'
		}
	};
}
