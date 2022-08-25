import faunadb from 'faunadb';

const q = faunadb.query;

export interface Definition {
	name: string;
}

export const CreateOrUpdateIndex = ({ name, ...definition }: Definition) =>
	q.If(
		q.Exists(q.Index(name)),
		q.Update(q.Index(name), definition),
		q.CreateIndex({ name, ...definition })
	);

export const CreateOrUpdateFunction = ({ name, ...definition }: Definition) =>
	q.If(
		q.Exists(q.Function(name)),
		q.Update(q.Function(name), definition),
		q.CreateFunction({ name, ...definition })
	);

export const CreateOrUpdateRole = ({ name, ...definition }: Definition) =>
	q.If(
		q.Exists(q.Role(name)),
		q.Update(q.Role(name), definition),
		q.CreateRole({ name, ...definition })
	);
