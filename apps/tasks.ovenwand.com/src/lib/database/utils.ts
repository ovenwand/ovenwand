import { q } from '@ovenwand/services.faunadb';

export function Pagination() {
	return q.If(
		q.Equals(q.Var('beforeCursor'), null),
		q.If(
			q.Equals(q.Var('afterCursor'), null),
			q.Paginate(q.Var('match'), { size: q.Var('size') }),
			q.Paginate(q.Var('match'), { size: q.Var('size'), after: q.Var('afterCursor') })
		),
		q.Paginate(q.Var('match'), { size: q.Var('size'), before: q.Var('beforeCursor') })
	);
}

export function GetRef() {
	return q.Lambda('ref', q.Get(q.Var('ref')));
}
