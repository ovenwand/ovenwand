import { query as q } from 'faunadb';

export interface Definition {
	name: string;
}

export const CreateOrUpdateFunction = ({ name, ...definition }: Definition) =>
	q.If(
		q.Exists(q.Function(name)),
		q.Update(q.Function(name), definition),
		q.CreateFunction(definition)
	);

export const CreateOrUpdateRole = ({ name, ...definition }: Definition) =>
	q.If(
		q.Exists(q.Role(name)),
		q.Update(q.Role(name), definition),
		q.CreateRole({ name, ...definition })
	);
