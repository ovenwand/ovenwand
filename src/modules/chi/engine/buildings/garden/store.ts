import { derived, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import { config } from './config';
import type { GardenState } from './model';

export interface GardenStore {
    chiPerClick: Writable<number>;
    chiPerSecond: Writable<number>;
    store: Readable<{ chiPerClick: number, chiPerSecond: number }>;
}

export function createStore(state: GardenState): GardenStore {
    const chiPerSecond = writable(config.generationRate);
    const chiPerClick = writable(config.collectionRate);

    const store = derived([chiPerSecond, chiPerClick], ([$chiPerSecond, $chiPerClick]) => ({
        chiPerSecond: $chiPerSecond,
        chiPerClick: $chiPerClick,
    }));

    return {
        chiPerClick,
        chiPerSecond,
        store,
    };
}