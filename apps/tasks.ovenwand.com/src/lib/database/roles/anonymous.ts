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
		}
	]
};
