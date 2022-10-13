import { createClient, createGql } from '@ovenwand/services.faunadb';
import { createClient as createGqlClient } from '@ovenwand/gql';
import { env } from '$env/dynamic/private';

export const { query, mutate } = createGqlClient({
	uri: `https://graphql.${env.FAUNA_DOMAIN}/graphql`,
	headers: {
		Authorization: `Bearer ${env.FAUNA_KEY}`
	}
});

export const { request } = createGql({
	domain: env.FAUNA_DOMAIN,
	secret: env.FAUNA_KEY
});

export const client = createClient({
	secret: env.FAUNA_KEY
});
