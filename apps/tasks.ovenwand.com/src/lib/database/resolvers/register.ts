import { q } from '@ovenwand/services.faunadb';

export const register = {
	name: 'register',
	body: q.Query(
		q.Lambda(
			['data'],
			q.Create(q.Collection('User'), {
				data: {
					email: q.Select('email', q.Var('data'))
				},
				credentials: {
					password: q.Select('password', q.Var('data'))
				}
			})
		)
	)
};
