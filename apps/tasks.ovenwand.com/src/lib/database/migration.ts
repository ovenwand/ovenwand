import { join, resolve } from 'path';
import { client, importSchema, q, type Expr } from '@ovenwand/services.faunadb';
import * as resolverMap from './resolvers';
import schemaUrl from './schema.gql?url';

const schemaPath = join(resolve(), schemaUrl);
const queue: Promise<unknown>[] = [];
const resolvers = Object.values(resolverMap);

function updateFunction(definition: { name: string; body: Expr }) {
	const { name } = definition;
	return client.query(
		q.If(
			q.Exists(q.Function(name)),
			q.Update(q.Function(name), definition),
			q.CreateFunction(definition)
		)
	);
}

function add(promise: Promise<unknown>) {
	queue.push(promise);
}

function settle() {
	const result = Promise.all(queue);
	queue.length = 0;
	return result;
}

export async function migrate() {
	for (const definition of resolvers) {
		add(updateFunction(definition));
	}

	add(importSchema(schemaPath));

	return settle();
}
