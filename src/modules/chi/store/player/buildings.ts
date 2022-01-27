import { createObjectStore } from '$modules/chi/util';

const store = createObjectStore([]);

export const buildings = {
    subscribe: store.subscribe,
    add: store.add,
    remove: store.remove,
};