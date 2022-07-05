import { fauna, type FaunaQueryBody, type FaunaResponseBody } from './request';

export async function gql<
	Data extends Record<string, unknown> = Record<string, unknown>,
	Errors extends unknown[] = unknown[]
>(
	query: FaunaQueryBody['query'],
	variables?: FaunaQueryBody['variables'],
	token?: string
): Promise<FaunaResponseBody<Data, Errors>> {
	const response = await fauna('/graphql', { query, variables }, token);
	return await response.json();
}
