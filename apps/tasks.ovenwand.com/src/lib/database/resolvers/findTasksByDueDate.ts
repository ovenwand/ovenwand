import { q } from '@ovenwand/services.faunadb';

export const findTasksByDueDate = {
	name: 'findTasksByDueDate',
	body: q.Query(
		q.Lambda(
			['fromDate', 'toDate'],
			q.Let(
				{
					index: q.Index('tasks_by_due_date'),
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
