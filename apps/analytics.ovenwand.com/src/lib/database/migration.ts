import { join, resolve } from 'node:path';
import { useQueue } from '@ovenwand/util';
import { importSchema, type FaunaImportMode } from '@ovenwand/services.faunadb';
import schemaUrl from './schema.gql?url';

const schemaPath = join(resolve(), schemaUrl);

export async function migrate(mode: FaunaImportMode = 'merge') {
	const { add, settle } = useQueue();
	add(importSchema(schemaPath, mode));
	return settle();
}
