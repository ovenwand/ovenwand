import { useRef } from 'react';
import { type RawSymbol } from './utils';
import { useTracker } from './tracker';

export const isRefKey: typeof RawSymbol = Symbol('isRef');

export type Ref<Type = unknown> = { current: Type; [isRefKey]: boolean };
export type MaybeRef<Type = unknown> = { current: Type } | Type;

export function ref<Type>(initialValue: Type): Ref<Type> {
	const target = useRef(initialValue);

	const [track, trigger] = useTracker();

	const proxy = new Proxy<Ref<Type>>(target, {
		get(target, key) {
			// const [track, trigger] = useTracker();
			const value = Reflect.get(target, key);

			// if (isRef(value)) {
			//   return get(value);
			// }

			if (key === isRefKey) {
				return true;
			}

			if (key === 'current') {
				track(value);
			}

			return value;
		},
		set(target, key, value) {
			// const [track, trigger] = useTracker();
			// const previousValue = Reflect.get(target, key);

			// if (isRef(previousValue)) {
			//   return set(previousValue, value);
			// }

			const result = Reflect.set(target, key, value);

			if (key === 'current') {
				trigger(value);
			}

			return result;
		}
	});

	return proxy;
}

export function get<Type extends Ref>(ref: Type): Type['current'] {
	return Reflect.get(ref, 'current');
}

export function set<Type extends Ref>(ref: Type, value: Type['current']): boolean {
	return Reflect.set(ref, 'current', value);
}

export function unwrap<Type extends MaybeRef>(maybeRef: Type): UnwrapRef<Type> {
	if (isRef(maybeRef)) {
		return maybeRef.current as UnwrapRef<Type>; // TODO figure out typings
	}

	return maybeRef as UnwrapRef<Type>; // TODO figure out typings
}

export function unwrapAll<Type extends Record<string, unknown>>(record: Type): UnwrapRef<Type> {
	const unwrapped: Record<string, unknown> = {};

	for (const key of Object.keys(record)) {
		unwrapped[key] = unwrap(record[key]);
	}

	return unwrapped as UnwrapRef<Type>; // TODO figure ouy typings
}

export function isRef<Type = unknown>(maybeRef: MaybeRef<Type>): maybeRef is Ref<Type> {
	return !!(maybeRef && (maybeRef as Ref)[isRefKey]);
}

export interface RefUnwrapBailTypes {
	runtimeDOMBailTypes: Node | Window;
}

export type UnwrapRef<T> = T extends Ref<infer V> ? UnwrapRefSimple<V> : UnwrapRefSimple<T>;

type BaseTypes = string | number | boolean;
// type CollectionTypes = IterableCollections | WeakCollections
// type IterableCollections = Map<any, any> | Set<any>
// type WeakCollections = WeakMap<any, any> | WeakSet<any>

export type UnwrapRefSimple<T> = T extends
	| Function
	// | CollectionTypes // Not sure why but this seems to break type inference
	| BaseTypes
	| Ref
	| RefUnwrapBailTypes[keyof RefUnwrapBailTypes]
	| { [RawSymbol]?: true }
	? T
	: T extends Array<any>
	? { [K in keyof T]: UnwrapRefSimple<T[K]> }
	: T extends object /*& { [ShallowReactiveMarker]?: never }*/
	? {
			[P in keyof T]: P extends symbol ? T[P] : UnwrapRef<T[P]>;
	  }
	: T;
