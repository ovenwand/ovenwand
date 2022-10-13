import { createClient, createGql } from '@ovenwand/services.faunadb';
import { env } from '$env/dynamic/private';

export const { gql, request } = createGql({
	domain: env.FAUNA_DOMAIN,
	secret: env.FAUNA_KEY
});

export const client = createClient({
	secret: env.FAUNA_KEY
});
