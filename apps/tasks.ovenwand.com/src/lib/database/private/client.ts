import { createClient, createGql } from '@ovenwand/services.faunadb';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

export const { request } = createGql({
	domain: publicEnv.PUBLIC_FAUNA_DOMAIN,
	secret: env.FAUNA_KEY
});

export const client = createClient({
	secret: env.FAUNA_KEY
});
