import { writable } from 'svelte/store';

export const AVATAR = 'avatar';
export const BRAND = 'brand';
export const BACK = 'back';

const actionStore = writable(null);
export const action = {
    subscribe: actionStore.subscribe,
    set(a) {
        // console.log(a, actionStore);
        actionStore.set(a);
    }
};

// TODO:
export const fluid = writable(true);