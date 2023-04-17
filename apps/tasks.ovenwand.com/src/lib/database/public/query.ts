/* eslint-disable @typescript-eslint/no-explicit-any */

import {
	type ApolloCache,
	ApolloError,
	type DefaultContext,
	type MutationOptions,
	type OperationVariables,
	type QueryOptions
} from '@ovenwand/gql';
import { getClient } from './client';

export interface QueryErrorResult {
	error: ApolloError;
	data?: null | undefined;
}

export interface QuerySuccessResult<Data = any> {
	error?: null | undefined;
	data: Data;
}

export type QueryResult<Data = any> = QuerySuccessResult<Data> | QueryErrorResult;

export type MutationResult<Data = any> = QueryResult<Data>;

export async function query<T = any, TVariables = OperationVariables>(
	query: QueryOptions['query'],
	options: Omit<QueryOptions<TVariables, T>, 'query'> = {}
): Promise<QueryResult<T>> {
	const client = getClient();

	try {
		const { data } = await client.query<T, TVariables>({
			query,
			...options
		});

		return { error: undefined, data };
	} catch (e) {
		if (e instanceof ApolloError) {
			return { error: e, data: undefined };
		}

		throw e;
	}
}

export async function mutate<
	TData = any,
	TVariables = OperationVariables,
	TContext = DefaultContext,
	TCache extends ApolloCache<any> = ApolloCache<any>
>(
	mutation: MutationOptions<TData, TVariables, TContext>['mutation'],
	options: Omit<MutationOptions<TData, TVariables, TContext>, 'mutation'> = {}
): Promise<MutationResult<TData>> {
	const client = getClient();

	try {
		const { data } = await client.mutate<TData, TVariables, TContext, TCache>({
			mutation,
			...options
		});

		return { error: undefined, data };
	} catch (e) {
		if (e instanceof ApolloError) {
			return { error: e, data: undefined };
		}

		throw e;
	}
}

/* eslint-enable @typescript-eslint/no-explicit-any */
