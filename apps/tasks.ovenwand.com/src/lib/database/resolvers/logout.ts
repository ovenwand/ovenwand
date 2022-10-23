import { q } from '@ovenwand/services.faunadb';

export const logout = {
	name: 'logout',
	body: q.Query(q.Lambda(['all'], q.Logout(q.Var('all'))))
};
