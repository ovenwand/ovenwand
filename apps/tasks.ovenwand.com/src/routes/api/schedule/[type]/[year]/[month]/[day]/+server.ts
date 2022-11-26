import { json } from '@sveltejs/kit';
import { setToFirstOfMonth, setToLastOfMonth } from '@ovenwand/util.date';
import { FindTasksByDueDate } from '$lib/database/queries';
import { query } from '$lib/database';
import { mapDataToTask } from '$lib/store/tasks/utils';

export async function GET({ params }: import('./$types').RequestEvent) {
	const { day, month, year } = params;
	const date = new Date(`${year}-${month}-${day}`);
	const fromDate = setToFirstOfMonth(date).toISOString();
	const toDate = setToLastOfMonth(date).toISOString();

	// TODO add error handling
	const { data, errors = null } = await query({
		query: FindTasksByDueDate,
		variables: {
			fromDate,
			toDate
		}
	});

	return json({
		errors,
		data: data?.findTasksByDueDate?.map(mapDataToTask)
	});
}
