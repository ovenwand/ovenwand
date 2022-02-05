import { get } from 'svelte/store';
import type { GameObject, GameObjectInstance } from '$modules/chi/engine';
import type { Player } from '$modules/chi/engine/player';
import type { MonkState } from './model';
import { createStore } from './store';

export function createInstance(player: Player, type: GameObject<MonkState>, state?: MonkState): GameObjectInstance<MonkState> {
    const { chiPerClick, chiPerSecond, collectionRate, collectionProgress, store } = createStore(state);

    return {
        type,

        subscribe: store.subscribe,

        chiPerSecond,

        chiPerClick,

        save() {
            return {
                collectionProgress: get(collectionProgress),
            };
        },

        generate() {
            return 0;
        },

        collect() {
            return 0;
        },
    };
}