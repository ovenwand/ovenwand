import type { Readable } from 'svelte/store';
import { deep } from '$lib/util/svelte/store';
import type { GameObject, GameObjectInstance } from '$modules/chi/engine';

export interface ObjectStore<State, Type extends GameObject<State>, Store extends GameObjectInstance<State>> extends Readable<Store[]> {
    clear(): void;
    add(object: Type, state?: State): boolean;
    remove(object: Type): boolean;
    map<R>(callback: (object: Store) => R): R[];
    forEach(callback: (object: Store) => unknown): void;
}

export function createObjectStore<State, Type extends GameObject<State>>(objects: GameObjectInstance<State>[]): ObjectStore<State, Type, GameObjectInstance<State>> {
    const store = deep<GameObjectInstance<State>>(objects);

    return {
        subscribe: store.subscribe,

        clear: store.clear,

        add(object, state?): boolean {
            const instance = object.createInstance(state);
            store.add(instance);
            return true;
        },

        remove(object): boolean {
            const $objects = store.get();
            const instance = $objects.find((instance) => instance.type.id === object.id);

            if ( instance) {
                store.remove(instance);
                return true;
            }

            return false;
        },

        forEach(callback) {
            const $objects = store.get();

            for (const object of $objects) {
                callback(object);
            }
        },

        map(callback) {
            const mapped = [];

            objects.forEach((object) => {
                mapped.push(callback(object));
            });

            return mapped;
        },
    };
}