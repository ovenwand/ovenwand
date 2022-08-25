import { createClient, createGql } from '@ovenwand/services.faunadb';
import { createClient as createGqlClient } from '@ovenwand/gql';

export const { query, mutate } = createGqlClient({
	uri: `https://graphql.${import.meta.env.VITE_FAUNA_DOMAIN}/graphql`,
	headers: {
		Authorization: `Bearer ${process.env.VITE_FAUNA_KEY}`
	}
});

export const { request } = createGql({
	domain: import.meta.env.VITE_FAUNA_DOMAIN,
	secret: import.meta.env.VITE_FAUNA_KEY
});

export const client = createClient({
	secret: import.meta.env.VITE_FAUNA_KEY
});
