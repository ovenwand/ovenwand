import { readable } from 'svelte/store';
import type { Readable, Subscriber, Unsubscriber } from 'svelte/store';
import { noop } from '$lib/util';

export interface DeepReadable<T extends Readable<unknown>> extends Readable<T[]> {
	clear(): void;

	add(store: T): void;

	remove(store: T): void;

	get(): T[];
}

export function deep<T extends Readable<unknown>, Stores extends T[] = T[]>(
	stores: Stores
): DeepReadable<T> {
	const $$stores: Stores = stores;
	let $$set: Subscriber<Stores> = noop;

	const store = readable<Stores>($$stores, (set) => {
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

		add(dependency) {
			const index = $$stores.push(dependency) - 1;
			unsubscribers[index] = dependency.subscribe(() => sync());
		},

		remove(dependency) {
			const index = $$stores.indexOf(dependency);

			if (index >= 0) {
				$$stores.splice(index, 1);
				const [unsubscribe] = unsubscribers.splice(index, 1);
				unsubscribe();
				sync();
			}
		},

		get() {
			return $$stores;
		}
	};
}
