import { Client, type ClientConfig } from 'faunadb';

export function createClient(options: ClientConfig) {
	return new Client(options);
}
