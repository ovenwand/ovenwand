import { q } from '@ovenwand/services.faunadb';

export const owner = {
	name: 'owner',
	membership: [
		{
			resource: q.Collection('User'),
			predicate: q.Query(
				q.Lambda(
					['ref'],
					q.Let(
						{
							role: 'owner',
							roleFromUser: ['data', 'role'],
							user: q.Get(q.Var('ref'))
						},
						q.Equals(q.Select(q.Var('roleFromUser'), q.Var('user')), q.Var('role'))
					)
				)
			)
		}
	],
	privileges: [
		{
			resource: q.Roles(),
			actions: { read: true, write: true, create: true, delete: true }
		},
		{
			resource: q.Collections(),
			actions: { read: true, write: true, create: true, delete: true }
		},
		{
			resource: q.Indexes(),
			actions: { read: true, write: true, create: true, delete: true }
		},
		{
			resource: q.Functions(),
			actions: { read: true, write: true, create: true, delete: true }
		},
		{
			resource: q.Collection('User'),
			actions: { read: true, create: true, delete: true, write: true }
		},
		{
			resource: q.Function('register'),
			actions: { read: true }
		},
		{
			resource: q.Function('logout'),
			actions: { read: true }
		}
	]
};
