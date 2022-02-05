import { decode, encode } from '$lib/util/base64';

function getStorage<T>(namespace: string, defaults: T, getter: (storage: string) => T): T {
	const storage = localStorage[namespace];
	return getter(storage);
	// return json ? JSON.parse(decode(json)) : defaults;
}

function setStorage<T>(namespace: string, storage: T, setter: (storage: T) => string): void {
	localStorage[namespace] = setter(storage);
	// localStorage[namespace] = encode(JSON.stringify(storage));
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
		return getStorage<T>(namespace, defaults, getter);
	}

	function set(storage: T) {
		return setStorage<T>(namespace, storage, setter);
	}

	function update(storage: Partial<T>) {
		const currentStorage = getStorage<T>(namespace, defaults, getter);
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
