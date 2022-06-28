import { q } from '@ovenwand/services.faunadb';

export const findTasksByLabel = {
	name: 'findTasksByLabel',
	body: q.Query(
		q.Lambda(
			['labelID', 'size', 'afterCursor', 'beforeCursor'],
			q.Map(
				q.Paginate(
					q.Match(q.Index('label_tasks_by_label'), q.Ref(q.Collection('Label'), q.Var('labelID')))
				),
				q.Lambda('ref', q.Get(q.Var('ref')))
			)
		)
	)
};
