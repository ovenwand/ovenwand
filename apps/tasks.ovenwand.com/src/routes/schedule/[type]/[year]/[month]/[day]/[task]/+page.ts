export async function load({ params, parent }: import('./$types').PageLoadEvent) {
	const { day, month, year, type, task } = params;

	return {
		...(await parent()),
		year,
		month,
		day,
		type,
		task
	};
}
