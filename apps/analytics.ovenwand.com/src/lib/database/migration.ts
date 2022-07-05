import { join, resolve } from 'node:path';
import { useQueue } from '@ovenwand/util';
import {
	client,
	CreateOrUpdateFunction,
	CreateOrUpdateRole,
	importSchema,
	q,
	type FaunaImportMode
} from '@ovenwand/services.faunadb';
import * as resolverMap from './resolvers';
import * as roleMap from './roles';
import schemaUrl from './schema.gql?url';

const schemaPath = join(resolve(), schemaUrl);
const resolvers = Object.values(resolverMap);
const roles = Object.values(roleMap);

function migrateFunction(definition: { name: string }, secret: string) {
	return client.query(CreateOrUpdateFunction(definition), { secret });
}

function migrateRole(definition: any, secret: string) {
	return client.query(CreateOrUpdateRole(definition), { secret });
}

export async function migrate(mode: FaunaImportMode, token: string) {
	const { add, settle } = useQueue();

	for (const definition of resolvers) {
		add(migrateFunction(definition, token));
	}

	for (const definition of roles) {
		add(migrateRole(definition, token));
	}

	add(importSchema(schemaPath, mode));

	return settle();
}
