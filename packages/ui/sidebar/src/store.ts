import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export interface SidebarState {
	expand: boolean;
}

export interface SidebarActions<State extends SidebarState> {
	add(id?: string, source?: State): SidebarStore<State>;
	remove(id?: string): SidebarStoreManager<State>;
	get(id: string): SidebarStore<State>;
	expand(id?: string): SidebarStoreManager<State>;
	contract(id?: string): SidebarStoreManager<State>;
}

type Subscriber<T> = (value: T) => void;
type Unsubscriber = () => void;
type Invalidator<T> = (value?: T) => void;
type Updater<T> = (value: T) => T;

export type SidebarStoreManager<State extends SidebarState = SidebarState> = {
	subscribe(
		id: string,
		subscriber: Subscriber<State>,
		invalidate?: Invalidator<State>
	): Unsubscriber;
	set(id: string, value: State): void;
	update(id: string, updater: Updater<State>): void;
} & SidebarActions<State>;

export interface SidebarStore<State extends SidebarState = SidebarState> extends Writable<State> {
	expand(): SidebarStore<State>;
	contract(): SidebarStore<State>;
}

export const DEFAULT_ID = 'ow-sidebar-default';

function _createSidebarStore(source: Partial<SidebarState> = {}): SidebarStore {
	const store: Writable<SidebarState> = writable<SidebarState>({
		expand: false,
		...source
	});

	const sidebar: SidebarStore = {
		subscribe: store.subscribe,
		set: store.set,
		update: store.update,

		expand() {
			store.update(_expandSidebar);
			return sidebar;
		},

		contract() {
			store.update(_contractSidebar);
			return sidebar;
		}
	};

	return sidebar;
}

function _expandSidebar(state: SidebarState): SidebarState {
	state.expand = true;
	return state;
}

function _contractSidebar(state: SidebarState): SidebarState {
	state.expand = false;
	return state;
}

const _sidebars: Record<string, SidebarStore> = {};

export const store: SidebarStoreManager = {
	subscribe(
		id: string,
		subscriber: Subscriber<SidebarState>,
		invalidate?: Invalidator<SidebarState>
	): Unsubscriber {
		const sidebar = store.get(id);
		return sidebar.subscribe(subscriber, invalidate);
	},
	set(id: string, value: SidebarState) {
		const sidebar = store.get(id);
		sidebar.set(value);
	},
	update(id: string, updater: Updater<SidebarState>) {
		const sidebar = store.get(id);
		sidebar.update(updater);
	},
	add(id: string = DEFAULT_ID, source?: SidebarState): SidebarStore {
		return (_sidebars[id] = _createSidebarStore(source));
	},
	remove(id: string = DEFAULT_ID): SidebarStoreManager {
		delete _sidebars[id];
		return store;
	},
	get(id: string = DEFAULT_ID): SidebarStore {
		return _sidebars[id];
	},
	expand(id: string = DEFAULT_ID): SidebarStoreManager {
		store.get(id).expand();
		return store;
	},
	contract(id: string = DEFAULT_ID): SidebarStoreManager {
		store.get(id).contract();
		return store;
	}
};
