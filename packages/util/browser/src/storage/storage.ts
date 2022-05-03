import { decode, encode } from '@ovenwand/util.string';

function getStorage<T>(namespace: string, getter: (storage: string) => T): T {
	const storage = localStorage[namespace];
	return getter(storage);
}

function setStorage<T>(namespace: string, storage: T, setter: (storage: T) => string): void {
	localStorage[namespace] = setter(storage);
}

function removeStorage(namespace: string): boolean {
	return delete localStorage[namespace];
}

export interface Storage<T extends {}> {
	read(): T;
	set(storage: T): void;
	update(storage: Partial<T>): void;
	clean(): boolean;
}

export function createStorage<T extends {}>(namespace: string, defaults: T): Storage<T> {
	const getter = (storage: string) => (storage ? JSON.parse(decode(storage)) : defaults);
	const setter = (data: T) => encode(JSON.stringify(data));

	function read(): T {
		return getStorage<T>(namespace, getter);
	}

	function set(storage: T) {
		return setStorage<T>(namespace, storage, setter);
	}

	function update(storage: Partial<T>) {
		const currentStorage = getStorage<T>(namespace, getter);
		return setStorage<T>(namespace, { ...currentStorage, ...storage }, setter);
	}

	function clean() {
		return removeStorage(namespace);
	}

	return {
		read,
		set,
		update,
		clean
	};
}
