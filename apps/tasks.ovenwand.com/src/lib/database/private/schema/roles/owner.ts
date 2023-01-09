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
							requiredRole: 'owner',
							roleFromUser: ['data', 'role'],
							user: q.Get(q.Var('ref')),
							userRole: q.Select(q.Var('roleFromUser'), q.Var('user'))
						},
						q.Equals(q.Var('userRole'), q.Var('requiredRole'))
					)
				)
			)
		}
	],
	privileges: [
		/**
		 * Schema privileges
		 */
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

		/**
		 * Auth privileges
		 */
		{
			resource: q.Collection('User'),
			actions: { read: true, create: true, delete: true, write: true }
		},
		{
			resource: q.Function('register'),
			actions: { call: true }
		},
		{
			resource: q.Function('logout'),
			actions: { call: true }
		},

		/**
		 * Task privileges
		 */
		{
			resource: q.Collection('Task'),
			actions: {
				read: q.Query(
					q.Lambda(
						['ref'],
						q.Equals(q.CurrentIdentity(), q.Select(['data', 'owner'], q.Get(q.Var('ref'))))
					)
				),
				create: q.Query(
					q.Lambda(
						['data'],
						q.Equals(q.CurrentIdentity(), q.Select(['data', 'owner'], q.Var('data')))
					)
				),
				delete: q.Query(
					q.Lambda(
						['ref'],
						q.Equals(q.CurrentIdentity(), q.Select(['data', 'owner'], q.Get(q.Var('ref'))))
					)
				),
				write: q.Query(
					q.Lambda(
						['oldData', 'newData'],
						q.And(
							q.Equals(q.CurrentIdentity(), q.Select(['data', 'owner'], q.Var('oldData'))),
							q.Equals(
								q.Select(['data', 'owner'], q.Var('oldData')),
								q.Select(['data', 'owner'], q.Var('newData'))
							)
						)
					)
				)
			}
		},
		{
			resource: q.Index('tasks'),
			actions: { read: true }
		},
		{
			resource: q.Index('tasksByDueDate'),
			actions: { read: true }
		},
		{
			resource: q.Index('tasksByStatus'),
			actions: { read: true }
		},
		{
			resource: q.Function('currentTask'),
			actions: { call: true }
		},
		{
			resource: q.Function('tasksByDueDate'),
			actions: { call: true }
		}
	]
};
