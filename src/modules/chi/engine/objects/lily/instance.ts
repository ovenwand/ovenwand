import { get } from 'svelte/store';
import { SECOND } from '$modules/chi/util';
import type { GameObject, GameObjectInstance } from '$modules/chi/engine';
import type { Player } from '$modules/chi/engine/player';
import type { LilyState } from './model';
import { createStore } from './store';

export function createInstance(player: Player, type: GameObject<LilyState>, state: LilyState = { growthCache: 0 }): GameObjectInstance<LilyState> {
    const { chiPerClick, chiPerSecond, growthCache, growthRate, growthLimit, store } = createStore(state);

    function grow(delta: number) {
        growthCache.update(($cache) => {
            const $growthRate = get(growthRate) * 5 * (delta / SECOND);
            const $growthLimit = get(growthLimit);
            return Math.min($cache + $growthRate, $growthLimit);
        });
    }

    function pluck() {
        growthCache.set(0);
    }

    return {
        type,

        subscribe: store.subscribe,

        chiPerSecond,

        chiPerClick,

        save() {
            return {
                growthCache: get(growthCache),
            };
        },

        tick(delta: number): void {
            grow(delta);
        },

        generate(delta: number) {
            const $chiPerSecond = get(chiPerSecond);
            return $chiPerSecond * (delta / 1000);
        },

        collect() {
            const $chiPerClick = get(chiPerClick);
            pluck();
            return $chiPerClick;
        },
    };
}