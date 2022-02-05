import { get } from 'svelte/store';
import type { GameObject, Save } from '$modules/chi/engine';
import type { Player } from './model';
import { chi, buildings, objects, inventory, store } from './store';

const hooks = {
    collect: [],
    buy: [],
    sell: [],
};

function trigger(event: keyof typeof hooks, ...args: unknown[]): void {
    hooks[event].forEach((handler) => handler(...args));
}

export const player: Player = {
    subscribe: store.subscribe,

    chi,

    objects,

    buildings,

    inventory,

    load(data: Save): void {
        objects.load(player, data.objects);
        chi.load(data.chi);
    },

    save(): Save {
        return {
            timestamp: Date.now(),
            chi: chi.save(),
            objects: objects.save()
        };
    },

    tick(delta: number): void {
        objects.tick(delta);
        chi.add(objects.generate(delta));
    },

    collect() {
        chi.add(1 + objects.collect());
        trigger('collect');
    },

    buy(object: GameObject): boolean {
        const $inventory = get(inventory);
        const price = object.price(player, $inventory[object.id]);

        if (chi.subtract(price)) {
            const instance = object.createInstance(player);
            objects.add(instance);
        }

        trigger('buy');

        return false;
    },

    sell(object: GameObject): boolean {
        const $inventory = get(inventory);
        const price = object.price(player, $inventory[object.id] - 1);

        if (objects.remove(object)) {
            chi.add(price * 0.25);
        }

        trigger('sell');

        return false;
    },

    on(event: keyof typeof hooks, handler): void {
        hooks[event].push(handler);
    },
};