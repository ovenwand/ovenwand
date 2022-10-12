export async function load({ fetch, params }: import('./$types').LayoutLoadEvent) {
	const { day, month, year, type, task } = params;

	const response = await fetch(`/api/schedule/${type}/${year}/${month}/${day}`, {
		headers: { 'content-type': 'application/json' }
	});

	const { data: tasks } = await response.json();

	return {
		year,
		month,
		day,
		type,
		task,
		tasks
	};
}
