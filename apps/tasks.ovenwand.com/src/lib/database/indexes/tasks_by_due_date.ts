import { q } from '@ovenwand/services.faunadb';

export const tasks_by_due_date = {
	name: 'tasks_by_due_date',
	source: q.Collection('Task'),
	values: [{ field: ['data', 'dueDate'] }, { field: ['ref'] }]
};
