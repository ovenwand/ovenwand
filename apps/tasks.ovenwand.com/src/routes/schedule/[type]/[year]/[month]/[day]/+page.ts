export async function load({ fetch, params }: import('./$types').PageLoadEvent) {
	const { day, month, year, type } = params;
	const response = await fetch(`/api/schedule/${type}/${year}/${month}/${day}`, {
		headers: { 'content-type': 'application/json' }
	});
	const { data: tasks } = await response.json();

	return {
		year,
		month,
		day,
		type,
		tasks
	};
}
