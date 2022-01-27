import { derived, writable } from 'svelte/store';
import type { GardenState } from './model';

export function createStore(state: GardenState = {}) {
    const chiPerSecond = writable(1);
    const chiPerClick = writable(0);

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