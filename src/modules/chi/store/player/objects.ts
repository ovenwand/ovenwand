import { createObjectStore } from '$modules/chi/util';
import type { Save } from '$modules/chi/engine';
import * as objectMap from '$modules/chi/engine/objects';

const store = createObjectStore([]);

export const objects = {
    subscribe: store.subscribe,
    add: store.add,
    remove: store.remove,

    load(data: Save['objects']): void {
        store.clear();

        for (const object of data) {
            store.add(objectMap[object.type], object.state);
        }
    },

    save(): Save['objects'] {
        return store.map((object) => ({
            type: object.type.id,
            state: object.save(),
        }));
    },

    tick(delta: number): void {
        store.forEach((instance) => instance.tick && instance.tick(delta));
    },

    generate(delta: number): number {
        let generated = 0;

        store.forEach((instance) => {
            generated += instance.generate(delta);
        });

        return generated;
    },

    collect(): number {
        let collected = 0;

        store.forEach((instance) => {
            collected += instance.collect();
        });

        return collected;
    },
};
