import { q } from '@ovenwand/services.faunadb';

export const currentTask = {
	name: 'currentTask',
	body: q.Query(
		q.Lambda(
			[],
			q.Let(
				{
					tasks: q.Match(q.Index('tasksByStatus'), 'open')
				},
				q.If(q.Exists(q.Var('tasks')), q.Get(q.Var('tasks')), null)
			)
		)
	)
};
