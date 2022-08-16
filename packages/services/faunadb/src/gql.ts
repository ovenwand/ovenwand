import type { ClientConfig } from 'faunadb';

export type FaunaQueryBody = { query: string; variables?: Record<string, unknown> };
export type FaunaImportMode = 'merge' | 'replace' | 'override';
export type FaunaImportBody = { mode: FaunaImportMode; schema: Buffer };
export type FaunaRequestBody = FaunaQueryBody | FaunaImportBody;
export type FaunaResponseBody<Data extends Record<string, unknown>, Errors extends unknown[]> = {
	data: Data;
	errors: Errors;
};

function getUrl(path: string, data: FaunaRequestBody, options: ClientConfig) {
	const url = new URL(`${options.scheme}://graphql.${options.domain}${path}`);

	if (isImportRequest(path, data)) {
		url.searchParams.set('mode', data.mode);
	}

	return url;
}

function getBody(path: string, data: FaunaRequestBody): FaunaQueryBody | Buffer {
	if (isImportRequest(path, data)) {
		return data.schema;
	}

	return data;
}

function isImportRequest(path: string, data: FaunaRequestBody): data is FaunaImportBody {
	return path === '/import';
}

export function createGql(config: ClientConfig) {
	const clientOptions: ClientConfig = {
		scheme: 'https',
		...config
	};

	async function request(
		path: string,
		data: FaunaRequestBody,
		options: Partial<ClientConfig> = {}
	) {
		const { scheme, domain, secret }: ClientConfig = {
			...clientOptions,
			secret: options.secret ?? clientOptions.secret
		};

		const url = getUrl(path, data, { scheme, domain, secret });

		const body = getBody(path, data);

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${secret}`,
				'Content-Type': 'application/json'
			},
			body: body instanceof Buffer ? body : JSON.stringify(body)
		});

		if (!response.ok) {
			const body = await response.clone().text();
			console.error(
				`[${response.status}] ${url} ${response.statusText}:\n\x1b[31m${body}\x1b[0m\n`
			);
			return response;
		}

		return response;
	}

	async function gql<
		Data extends Record<string, unknown> = Record<string, unknown>,
		Errors extends unknown[] = unknown[]
	>(
		query: FaunaQueryBody['query'],
		variables?: FaunaQueryBody['variables'],
		options?: Partial<ClientConfig>
	): Promise<FaunaResponseBody<Data, Errors>> {
		const response = await request('/graphql', { query, variables }, options);
		return await response.json();
	}

	return {
		request,
		gql
	};
}
