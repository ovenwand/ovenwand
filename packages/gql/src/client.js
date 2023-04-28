import { ApolloClient, InMemoryCache } from '@apollo/client/core';

/**
 * @typedef {Omit<import('@apollo/client/core').ApolloClientOptions<CacheShape>, 'cache'> & { cache?: import('@apollo/client/core').ApolloCache<CacheShape> }} GqlClientOptions<CacheShape>
 * @template CacheShape
 */

/**
 * @template CacheShape
 * @param options {GqlClientOptions<CacheShape>}
 * @returns ApolloClient<CacheShape>
 */
export function createClient(options) {
	// TODO Figure out what to pass as cache type :)
	return new ApolloClient({
		cache: new InMemoryCache(),
		...options
	});
}
