import { q } from '@ovenwand/services.faunadb';

export const findCurrentTask = {
	name: 'findCurrentTask',
	body: q.Query(
		q.Lambda(
			[],
			q.Let(
				{
					index: q.Index('tasks_by_schedule'),
					value: 'current',
					currentTasks: q.Match(q.Var('index'), q.Var('value'))
				},
				q.Get(q.Var('currentTasks'))
			)
		)
	)
};
