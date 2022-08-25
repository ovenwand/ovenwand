import { q } from '@ovenwand/services.faunadb';

export const tasks_by_schedule = {
	name: 'tasks_by_schedule',
	source: q.Collection('Task'),
	terms: [{ field: ['data', 'schedule'] }]
};
