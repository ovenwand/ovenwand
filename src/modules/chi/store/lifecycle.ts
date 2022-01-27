import { derived, writable } from 'svelte/store';
import { beforeInitialize, beforeLoad, beforeTick } from '$modules/chi/engine';

const loading = writable(true);
const initializing = writable(false);
const ticking = writable(false);

const status = derived(
	[loading, initializing, ticking],
	([$loading, $initializing, $ticking], set) => {
		if ($loading) {
			set('loading');
		} else if ($initializing) {
			set('initializing');
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

beforeInitialize(() => {
	loading.set(false);
	initializing.set(true);
});

beforeTick(() => {
	initializing.set(false);
	ticking.set(true);
});

export const lifecycle = {
	subscribe: status.subscribe,
	loading,
	initializing,
	ticking
};
