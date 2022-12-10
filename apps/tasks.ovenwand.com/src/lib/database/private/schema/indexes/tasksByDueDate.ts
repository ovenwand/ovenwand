import { q } from '@ovenwand/services.faunadb';

export const tasksByDueDate = {
	name: 'tasksByDueDate',
	source: q.Collection('Task'),
	values: [{ field: ['data', 'dueDate'] }, { field: ['ref'] }]
};
