import { q } from '@ovenwand/services.faunadb';

export const login = {
	name: 'login',
	body: q.Query(
		q.Lambda(
			['data'],
			q.Login(q.Match(q.Index('userByEmail'), q.Select('email', q.Var('data'))), {
				password: q.Select('password', q.Var('data'))
			})
		)
	)
};
