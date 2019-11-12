import { writable } from 'svelte/store';

export const title = writable('');
export const location = writable(typeof document !== 'undefined' ? document.location : {});