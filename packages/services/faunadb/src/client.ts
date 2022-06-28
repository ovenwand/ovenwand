import faunadb from 'faunadb';

const { Client } = faunadb;

function createClient() {
	return new Client({
		secret: import.meta.env.VITE_FAUNA_KEY
	});
}

export const client = createClient();
