import {
	ApolloClient,
	InMemoryCache,
	type ApolloClientOptions,
	ApolloCache
} from '@apollo/client/core';

export type GqlClientOptions<CacheShape> = Omit<ApolloClientOptions<CacheShape>, 'cache'> & {
	cache?: ApolloCache<CacheShape>;
};

export function createClient<CacheShape>(options: GqlClientOptions<CacheShape>) {
	// TODO Figure out what to pass as cache type :)
	const client = new ApolloClient<CacheShape>({
		cache: new InMemoryCache(),
		...options
	});

	return {
		query: client.query,
		mutate: client.mutate
	};
}
