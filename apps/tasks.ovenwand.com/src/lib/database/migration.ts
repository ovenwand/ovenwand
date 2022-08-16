import { join, resolve } from 'path';
import { importSchema, q, type Definition } from '@ovenwand/services.faunadb';
import { client } from '$lib/database';
import * as resolverMap from './resolvers';
import schemaUrl from './schema.gql?url';

const schemaPath = join(resolve(), schemaUrl);
const queue: Promise<unknown>[] = [];
const resolvers = Object.values(resolverMap);

function updateFunction(definition: Definition) {
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
