import { createClient, createGql } from '@ovenwand/services.faunadb';

export const { gql, request } = createGql({
	domain: import.meta.env.VITE_FAUNA_DOMAIN,
	secret: import.meta.env.VITE_FAUNA_KEY
});

export const client = createClient({
	secret: import.meta.env.VITE_FAUNA_KEY
});
