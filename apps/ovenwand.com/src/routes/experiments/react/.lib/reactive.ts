import { useRef } from 'react';
import { type RawSymbol } from './utils';
import { isRef, isRefKey, get, set, type MaybeRef, type UnwrapRef } from './ref';
import { useTracker } from './tracker';

export const isReactiveKey: typeof RawSymbol = Symbol('isReactive');
export type Reactive<Type extends {}> = UnwrapRef<Type> & { [isReactiveKey]: boolean };

export function reactive<Type extends Record<string | symbol, unknown>>(
	initialValue: Type
): Reactive<Type> {
	const target = { ...initialValue, [isReactiveKey]: true };
	const [track, trigger] = useTracker();

	const proxy: Reactive<UnwrapRef<Type>> = new Proxy<Reactive<Type>>(target, {
		get(target, key) {
			const value = Reflect.get(target, key);

			if (isRef(value)) {
				return get(value);
			}

			if (![isRefKey, isReactiveKey].includes(key)) {
				track(value);
			}

			return value;
		},
		set(target, key, value) {
			const previousValue = Reflect.get(target, key);

			if (isRef(previousValue)) {
				return set(previousValue, value);
			}

			const result = Reflect.set(target, key, value);

			if (![isRefKey, isReactiveKey].includes(key)) {
				trigger(value);
			}

			return result;
		}
	});

	return useRef(proxy).current as Reactive<Type>;
}
