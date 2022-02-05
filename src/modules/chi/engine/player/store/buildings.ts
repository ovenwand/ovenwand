import { createObjectStore } from '$modules/chi/util';
import type { ObjectStore } from '$modules/chi/util';
import type { GameObjectLifecycle } from '$modules/chi/engine';

const store = createObjectStore([]);

export const buildings: GameObjectLifecycle & ObjectStore<unknown> = {
    ...store,
};