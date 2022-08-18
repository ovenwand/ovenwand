import faunadb from 'faunadb';
import type { ClientConfig } from 'faunadb';

const { Client } = faunadb;

export function createClient(options: ClientConfig) {
	return new Client(options);
}
