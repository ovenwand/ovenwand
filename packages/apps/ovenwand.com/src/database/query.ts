export async function gql(
	query: string,
	variables: Record<string, unknown> = {}
): Promise<{ data: any; errors: any[] }> {
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
