import { q } from '@ovenwand/services.faunadb';

export const findCurrentTask = {
	name: 'findCurrentTask',
	body: q.Query(
		q.Lambda(
			[],
			q.Let(
				{
					doneFromTask: ['data', 'done'],
					scheduleFromTask: ['data', 'schedule'],
					tasks: q.Match(q.Index('tasks')),
					currentTasks: q.Filter(
						q.Map(q.Var('tasks'), q.Lambda(['task'], q.Get(q.Var('task')))),
						q.Lambda(
							['task'],
							q.And(
								q.Equals(q.Select(q.Var('doneFromTask'), q.Get(q.Var('task'))), false),
								q.Equals(q.Select(q.Var('scheduleFromTask'), q.Get(q.Var('task'))), 'unscheduled')
							)
						)
					)
				},
				q.Get(q.Var('currentTasks'))
			)
		)
	)
};
