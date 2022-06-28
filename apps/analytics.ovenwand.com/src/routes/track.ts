import type { RequestEvent } from '@sveltejs/kit';
import { gql } from '@ovenwand/services.faunadb';
import type { IEvent } from '$lib/store';

export async function post({ request }: RequestEvent) {
	const body = await request.json();

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
				uri: body.uri,
				details: body.details,
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
