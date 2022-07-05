export type FaunaQueryBody = { query: string; variables?: Record<string, unknown> };
export type FaunaImportMode = 'merge' | 'replace' | 'override';
export type FaunaImportBody = { mode: FaunaImportMode; schema: Buffer };
export type FaunaRequestBody = FaunaQueryBody | FaunaImportBody;
export type FaunaResponseBody<Data extends Record<string, unknown>, Errors extends unknown[]> = {
	data: Data;
	errors: Errors;
};

function getUrl(path: string, data: FaunaRequestBody) {
	const url = new URL(`https://graphql.${import.meta.env.VITE_FAUNA_DOMAIN}${path}`);

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

export async function fauna(
	path: '/graphql',
	data: FaunaQueryBody,
	token?: string
): Promise<Response>;
export async function fauna(
	path: '/import',
	data: FaunaImportBody,
	token?: string
): Promise<Response>;
export async function fauna(
	path: '/graphql' | '/import',
	data: FaunaRequestBody,
	token?: string
): Promise<Response> {
	const url = getUrl(path, data);
	const body = getBody(path, data);

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token ?? import.meta.env.VITE_FAUNA_KEY}`,
			'Content-Type': 'application/json'
		},
		body: body instanceof Buffer ? body : JSON.stringify(body)
	});

	if (!response.ok) {
		const body = await response.clone().text();
		console.error(`[${response.status}] ${url} ${response.statusText}:\n\x1b[31m${body}\x1b[0m\n`);
		return response;
	}

	return response;
}
