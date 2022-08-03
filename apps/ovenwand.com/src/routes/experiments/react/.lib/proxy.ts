import { useCallback, useSyncExternalStore } from 'react';
import { isObject } from '@ovenwand/util';

const proxyCache = new WeakMap();

const SNAPSHOT = Symbol('@@snapshot');

export function useSetup<Create extends () => any>(create: Create) {
	const state = proxy(create());

	const currentSnapshot = useSyncExternalStore(
		useCallback((callback) => {
			const unsubscribe = subscribe(state);
			callback();
			return unsubscribe;
		}),
		() => {},
		() => snapshot()
	);
}

export function proxy<Type extends {}>(initialValue: Type) {
	if (proxyCache.has(initialValue)) {
		return proxyCache.get(initialValue);
	}

	const target = createProxyTarget(initialValue);

	const handler = {
		get(target, prop, receiver) {
			if (prop === SNAPSHOT) {
				return createSnapshot(target, receiver);
			}

			return Reflect.get(target, prop, receiver);
		},

		set(target, prop, value, receiver) {
			const hasPreviousValue = Reflect.has(target, prop);
			const previousValue = Reflect.get(target, prop, receiver);
			if (hasPreviousValue && Object.is(previousValue, value)) {
				return true;
			}

			let nextValue = value;

			// if (canProxy(value)) {
			//   nextValue = proxy(value);
			// }

			const result = Reflect.set(target, prop, nextValue, receiver);

			emit();

			return result;
		}
	};

	const state = new Proxy(target, handler);
	proxyCache.set(initialValue, state);
	return state;
}

// Public utils

function snapshot() {}

function subscribe(state) {
	return function unsubscribe() {};
}

// internal utils
function createProxyTarget(source) {
	return Array.isArray(source) ? [] : Object.create(Object.getPrototypeOf(source));
}

function createSnapshot() {}

// function canProxy(value: unknown) {
//   return (
//     isObject(value) &&
//     // !refCache.has(value) && // Allows skipping nesting proxy if they're in the refCache
//     (Array.isArray(value) || !(Symbol.iterator in value)) &&
//     !(value instanceof WeakMap) &&
//     !(value instanceof WeakSet) &&
//     !(value instanceof Error) &&
//     !(value instanceof Number) &&
//     !(value instanceof Date) &&
//     !(value instanceof String) &&
//     !(value instanceof RegExp) &&
//     !(value instanceof ArrayBuffer)
//   );
// }
