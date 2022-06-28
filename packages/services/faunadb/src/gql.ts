import { fauna, type FaunaQueryBody, type FaunaResponseBody } from './request';

export async function gql<Data extends Record<string, unknown> = {}, Errors extends Error[] = []>(
	query: FaunaQueryBody['query'],
	variables?: FaunaQueryBody['variables']
): Promise<FaunaResponseBody<Data, Errors>> {
	const response = await fauna('/graphql', { query, variables });

	const body = await response.json();

	if (body.errors) {
		console.error(body.errors);
	}

	return body;
}
