import { writable } from 'svelte/store';

export const AVATAR = 'avatar';
export const BRAND = 'brand';

const brandStore = writable(null);

export const brand = {
    subscribe: brandStore.subscribe,
    set(a) {
        brandStore.set(a);
    },
};

export const fluid = writable(true);