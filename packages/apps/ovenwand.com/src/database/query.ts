export async function gql<
	Data extends Record<string, unknown> = {},
	Errors extends { message: string }[] = []
>(query: string, variables?: Record<string, unknown>): Promise<{ data: Data; errors: Errors }> {
	const response = await fetch(import.meta.env.VITE_FAUNA_URL, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_FAUNA_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			query,
			variables
		})
	});

	const body = await response.json();

	if (body.errors) {
		console.error(body.errors);
	}

	return body;
}
