import { derived, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import { config } from './config';
import type { LilyState } from './model';

export interface LilyStore {
	growthCache: Writable<number>;
	growthRate: Writable<number>;
	growthLimit: Writable<number>;
	chiPerClick: Readable<number>;
	chiPerSecond: Readable<number>;
	store: Readable<{ growthCache: number; chiPerSecond: number; chiPerClick: number }>;
}

export function createStore(state: LilyState): LilyStore {
	const growthCache = writable(state.growthCache);
	const growthRate = writable(config.generationRate);
	const growthLimit = writable(config.growthLimit);

	const chiPerSecond = derived(
		[growthCache, growthRate, growthLimit],
		([$cache, $rate, $limit]) => {
			const overflow = $cache + $rate - $limit;
			return Math.max(0, overflow);
		}
	);

	const chiPerClick = derived(growthCache, ($growthCache) => {
		return $growthCache;
	});

	const store = derived(
		[growthCache, chiPerSecond, chiPerClick],
		([$growthCache, $chiPerSecond, $chiPerClick]) => ({
			growthCache: $growthCache,
			chiPerSecond: $chiPerSecond,
			chiPerClick: $chiPerClick
		})
	);

	return {
		growthCache,
		growthRate,
		growthLimit,
		chiPerClick,
		chiPerSecond,
		store
	};
}
