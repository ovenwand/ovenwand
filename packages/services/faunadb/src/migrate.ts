import type { Client } from 'faunadb';
import { CreateOrUpdateFunction, CreateOrUpdateIndex, type Definition } from './helpers';

export function migrateFunction(definition: Definition, secret: string) {
	return async ({ client }: { client: Client }) =>
		client.query(CreateOrUpdateFunction(definition), { secret });
}

export function migrateIndex(definition: Definition, secret: string) {
	return async ({ client }: { client: Client }) =>
		client.query(CreateOrUpdateIndex(definition), { secret });
}
