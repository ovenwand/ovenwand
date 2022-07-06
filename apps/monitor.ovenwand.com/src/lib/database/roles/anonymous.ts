import { q } from '@ovenwand/services.faunadb';

export const anonymous = {
	name: 'anonymous',
	membership: [],
	privileges: [
		{
			resource: q.Collection('User'),
			actions: { read: true }
		},
		{
			resource: q.Index('userByEmail'),
			actions: { read: true }
		},
		{
			resource: q.Function('login'),
			actions: { call: true }
		},
		{
			resource: q.Collection('Project'),
			actions: { read: true }
		},
		{
			resource: q.Index('allProjects'),
			actions: { read: true }
		},
		{
			resource: q.Collection('Event'),
			actions: { read: true }
		},
		{
			resource: q.Index('allEvents'),
			actions: { read: true }
		},
		{
			resource: q.Index('event_project_by_project'),
			actions: { read: true }
		}
	]
};
