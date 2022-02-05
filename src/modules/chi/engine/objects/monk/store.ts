import { derived, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import { config } from './config';
import type { MonkState } from './model';

export interface MonkStore {
    chiPerClick: Readable<number>;
    chiPerSecond: Readable<number>;
    collectionRate: Writable<number>;
    collectionProgress: Writable<number>;
    store: Readable<{ chiPerClick: number, chiPerSecond: number, collectionRate: number, collectionProgress: number }>;
}

export function createStore(state: MonkState = { collectionProgress: 0 }): MonkStore {
    const collectionProgress = writable(state.collectionProgress);
    const collectionRate = writable(config.collectionRate)

    const chiPerClick = writable(0);

    const chiPerSecond = derived([collectionProgress, collectionRate], ([$collectionProgress, $collectionRate]) => {
        return 0;
    });

    const store = derived([chiPerClick, chiPerSecond, collectionRate, collectionProgress], ([$chiPerClick, $chiPerSecond, $collectionRate, $collectionProgress]) => ({
        chiPerClick: $chiPerClick,
        chiPerSecond: $chiPerSecond,
        collectionRate: $collectionRate,
        collectionProgress: $collectionProgress,
    }));

    return {
        chiPerClick,
        chiPerSecond,
        collectionRate,
        collectionProgress,
        store,
    };
}