import { get } from 'svelte/store';
import { SECOND } from '$modules/chi/util';
import type { GameObject, GameObjectInstance } from '$modules/chi/engine';
import type { Player } from '$modules/chi/engine/player';
import { createStore } from './store';

export function createInstance(
	player: Player,
	type: GameObject,
	state: {} = {}
): GameObjectInstance<{}> {
	const { chiPerClick, chiPerSecond, store } = createStore(state);

	return {
		type,

		subscribe: store.subscribe,

		chiPerClick,
		chiPerSecond,

		save(): {} {
			return {};
		},

		generate(delta: number): number {
			return get(chiPerSecond) * (delta / SECOND);
		},

		collect(): number {
			return get(chiPerClick);
		}
	};
}
