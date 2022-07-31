import type { RequestEvent } from '@sveltejs/kit';
import { gql } from '@ovenwand/services.faunadb';
import type { IEvent } from '$lib/store';

export async function POST({ request }: RequestEvent) {
	const body = await request.json();

	const details = {
		agent: request.headers.get('User-Agent') || 'unknown'
	};

	const { data, errors } = await gql<{ createEvent: IEvent }>(
		`
		mutation CreateEvent($data: EventInput!) {
			createEvent(data: $data) {
				_id
				project {
					_id
				}
			}
		}`,
		{
			data: {
				type: body.type,
				timestamp: body.timestamp,
				page: body.page,
				uri: body.uri,
				details: { ...body.details, ...details },
				project: { connect: body.project }
			}
		}
	);

	return {
		body: {
			errors,
			data: data?.createEvent
		}
	};
}
