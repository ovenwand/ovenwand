import type { Readable, Subscriber, Unsubscriber } from 'svelte/store';
import { derived, get, readable } from 'svelte/store';
import { noop } from '$lib/util';
import * as objectMap from '$modules/chi/engine/objects';
import type { GameObject, GameObjectInstance } from '$modules/chi/engine/model';
import type { Save } from '$modules/chi/engine';

interface DeepReadable<T> extends Readable<T[]> {
    clear(): void;

    add(store: T): void;

    remove(store: T): void;
}

function deep(stores: Readable<any>[]): DeepReadable<any> {
	const $$stores: Readable<any>[] = stores;
	let $$set: Subscriber<any> = noop;

	const store = readable<any>($$stores, (set) => {
        $$set = set;
    });

	const unsubscribers: Unsubscriber[] = [];

    function sync() {
        $$set($$stores);
    }

    return {
        subscribe: store.subscribe,

        clear() {
            for (const unsubscribe of unsubscribers) {
                unsubscribe();
            }

            $$stores.length = 0;
            unsubscribers.length = 0;

            sync();
        },

        add(dependency: Readable<any>): void {
            const index = $$stores.push(dependency) - 1;
            unsubscribers[index] = dependency.subscribe(() => sync());
        },

        remove(dependency: Readable<any>): void {
            const index = $$stores.indexOf(dependency);

            if (index >= 0) {
                $$stores.splice(index, 1);
                const [unsubscribe] = unsubscribers.splice(index, 1);
                unsubscribe();
                sync();
            }
        },
    };
}

const store = deep([]);

const inventory = derived(store, ($objects) => {
    const $inventory = Object.keys(objectMap).reduce((inventory, id) => {
        inventory[id] = 0;
        return inventory;
    }, {});

    for (const object of $objects) {
        $inventory[object.type.id]++;
    }

    return $inventory;
});

export const objects = {
    subscribe: store.subscribe,

    inventory,

    forEach(callback: (object: GameObjectInstance) => unknown): void {
        const $objects = get(store);

        for (const object of $objects) {
            callback(object);
        }
    },

    map<T>(callback: (object: GameObjectInstance) => T): T[] {
        const mapped: T[] = [];

        objects.forEach((object) => {
            mapped.push(callback(object));
        });

        return mapped;
    },

    load(data: Save['objects']) {
        objects.clear();

        for (const object of data) {
            objects.add(objectMap[object.type], object.state);
        }
    },

    save(): Save['objects'] {
        return objects.map((object) => ({
            type: object.type.id,
            state: object.save(),
        }));
    },

    generate(delta: number): number {
        let generated = 0;

        objects.forEach((instance) => {
            generated += instance.generate(delta);
        });

        return generated;
    },

    collect(): number {
        let collected = 0;

        objects.forEach((instance) => {
            collected += instance.collect();
        });

        return collected;
    },

    clear() {
        store.clear();
    },

    add(object: GameObject, state?: unknown) {
        const instance = object.createInstance(state);
        store.add(instance);
        return true;
    },

    remove(object: GameObject) {
        const $objects = get(store);
        const instance = $objects.find((instance) => instance.type.id === object.id);

        if (instance) {
            store.remove(instance);
            return true;
        }

        return false;
    },
};
