import { setToFirstOfMonth, setToLastOfMonth } from '@ovenwand/util.date';
import { useTasks } from '$lib/database';

export async function load({ parent, params }: import('./$types').LayoutLoadEvent) {
	await parent();

	const { day, month, year, type, task } = params;
	const date = new Date(`${year}-${month}-${day}`);

	const tasks = useTasks();

	const { error, data } = await tasks.query.byDueDate(
		setToFirstOfMonth(date).toISOString(),
		setToLastOfMonth(date).toISOString()
	);

	return {
		errors: [error],
		year,
		month,
		day,
		type,
		task,
		tasks: data?.tasksByDueDate
	};
}
