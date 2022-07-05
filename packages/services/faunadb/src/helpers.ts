import { query as q } from 'faunadb';

export const CreateOrUpdateFunction = (definition) =>
	q.If(
		q.Exists(q.Function(definition.name)),
		q.Update(q.Function(definition.name), definition),
		q.CreateFunction(definition)
	);

export const CreateOrUpdateRole = ({ name, ...definition }) =>
	q.If(
		q.Exists(q.Role(name)),
		q.Update(q.Role(name), definition),
		q.CreateRole({ name, ...definition })
	);
