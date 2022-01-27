import { get } from 'svelte/store';
import { SECOND } from '$modules/chi/util';
import type { GameObject, GameObjectInstance } from '$modules/chi/engine';
import { createStore } from './store';
import type { GardenState } from './model';

export function createInstance(type: GameObject<GardenState>, state: GardenState = {}): GameObjectInstance<GardenState> {
    const { chiPerClick, chiPerSecond, store } = createStore(state);

    return {
        type,

        subscribe: store.subscribe,

        chiPerClick,
        chiPerSecond,

        save(): GardenState {
            return {};
        },

        generate(delta: number): number {
            return get(chiPerSecond) * (delta / SECOND);
        },

        collect(): number {
            return get(chiPerClick);
        },
    };
}