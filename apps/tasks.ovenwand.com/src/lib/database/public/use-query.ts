import { writable } from 'svelte/store';
import type { QueryResult } from './query';

export function useQuery<Result extends QueryResult>(query: () => Promise<Result>) {
	const loading = writable(true);
	const error = writable<undefined | Error>(undefined);
	const data = writable<undefined | object>(undefined);
	const currentQuery = writable<Promise<Result>>(undefined);

	currentQuery.set(
		query()
			.then((result) => {
				error.set(result.error);
				data.set(result.data);
				loading.set(false);
				return result;
			})
			.catch((e) => {
				loading.set(false);
				return Promise.reject(e);
			})
	);

	return {
		error,
		data,
		loading,
		currentQuery
	};
}
