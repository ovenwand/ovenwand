import { derived, writable } from 'svelte/store';
import type { LilyState } from './model';

export function createStore(state: LilyState) {
    const growthCache = writable(state.growthCache);
    const growthRate = writable(1);
    const growthLimit = writable(10);

    const chiPerSecond = derived([growthCache, growthRate, growthLimit], ([$cache, $rate, $limit]) => {
        const overflow = $cache + $rate - $limit;
        return Math.max(0, overflow) / 10;
    });

    const chiPerClick = derived(growthCache, ($growthCache) => {
        return $growthCache;
    });

    const store = derived([growthCache, chiPerSecond, chiPerClick], ([$growthCache, $chiPerSecond, $chiPerClick]) => ({
        growthCache: $growthCache,
        chiPerSecond: $chiPerSecond,
        chiPerClick: $chiPerClick,
    }));

    return {
        growthCache,
        growthRate,
        growthLimit,
        chiPerClick,
        chiPerSecond,
        store,
    };
}