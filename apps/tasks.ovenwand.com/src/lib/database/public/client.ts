import { createClient, type ApolloClient } from '@ovenwand/gql';
import { PUBLIC_FAUNA_DOMAIN } from '$env/static/public';
import { getSession } from '$lib/auth';

const clients = new WeakMap<App.Session, ApolloClient<unknown>>();

export function getClient<Client extends ApolloClient<unknown>>(session = getSession()): Client {
	if (!session?.token) {
		throw new Error("Can't create a database client without a valid session");
	}

	if (!clients.has(session)) {
		const client = createClient({
			uri: `https://graphql.${PUBLIC_FAUNA_DOMAIN}/graphql`,
			headers: {
				Authorization: `Bearer ${session.token}`
			}
		});

		clients.set(session, client);
	}

	return clients.get(session) as Client;
}
