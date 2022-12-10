import { q } from '@ovenwand/services.faunadb';

export const tasksByDueDate = {
	name: 'tasksByDueDate',
	body: q.Query(
		q.Lambda(
			['fromDate', 'toDate'],
			q.Let(
				{
					index: q.Index('tasksByDueDate'),
					range: q.Range(q.Match(q.Var('index')), q.Var('fromDate'), q.Var('toDate'))
				},
				q.Map(
					q.Select(['data'], q.Paginate(q.Var('range'))),
					q.Lambda(['date', 'ref'], q.Get(q.Var('ref')))
				)
			)
		)
	)
};
