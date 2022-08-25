import { join, resolve } from 'path';
import { useQueue } from '@ovenwand/util';
import {
	importSchema,
	migrateIndex,
	migrateFunction,
	type FaunaImportMode
} from '@ovenwand/services.faunadb';
import { client, request } from '$lib/database';
import * as indexMap from './indexes';
import * as resolverMap from './resolvers';
import schemaUrl from './schema.gql?url';

const schemaPath = join(resolve(), schemaUrl);
const resolvers = Object.values(resolverMap);
const indices = Object.values(indexMap);

export async function migrate(mode: FaunaImportMode, token: string) {
	const { add, settle } = useQueue({ client, request });

	for (const definition of indices) {
		add(migrateIndex(definition, token));
	}

	for (const definition of resolvers) {
		add(migrateFunction(definition, token));
	}

	add(importSchema(schemaPath));

	return settle();
}
