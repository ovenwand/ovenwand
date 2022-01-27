import { decode, encode } from '$lib/util/base64';

function getStorage<T extends {}>(namespace: string, defaults: T): T {
	const json = localStorage[namespace];
	return json ? JSON.parse(decode(json)) : defaults;
}

function setStorage<T extends {}>(namespace: string, storage: Partial<T>): void {
	localStorage[namespace] = encode(JSON.stringify(storage));
}

function removeStorage(namespace: string) {
	return delete localStorage[namespace];
}

export function createStorage<T extends {}>(namespace: string, defaults: T) {
	function read(): T {
		return getStorage(namespace, defaults);
	}

	function set(storage: T) {
		return setStorage<T>(namespace, storage);
	}

	function update(storage: Partial<T>) {
		const currentStorage = getStorage<T>(namespace, defaults);
		return setStorage<T>(namespace, { ...currentStorage, ...storage });
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
