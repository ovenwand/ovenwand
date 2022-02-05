import { derived, writable } from 'svelte/store';
import { beforeLoad, beforeTick } from '$modules/chi/engine';

const loading = writable(false);
const ticking = writable(false);

const status = derived(
    [loading, ticking],
    ([$loading, $ticking], set) => {
        if ($loading) {
            set('loading');
        } else if ($ticking) {
            set('ticking');
        } else {
            set('idle');
        }
    }
);

beforeLoad(() => {
    loading.set(true);
});

beforeTick(() => {
    loading.set(false);
    ticking.set(true);
});

export const lifecycle = {
    subscribe: status.subscribe,
    loading,
    ticking
};
