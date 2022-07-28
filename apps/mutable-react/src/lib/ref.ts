import { useRef, useState } from 'react';
import { type RawSymbol } from "./utils";

export const isRefKey = Symbol('isRef');

export type Ref<Type = unknown> = { current: Type, [isRefKey]: boolean };
export type MaybeRef<Type = unknown> = { current: Type } | Type;

export function ref<Type>(initialValue: Type): Ref<Type> {
  const [state, update] = useState(initialValue);
  const target = { current: state, [isRefKey]: true };

  const ref = useRef(new Proxy<Ref<Type>>(target, {
    set(ref, key, value) {
      if (key === 'current') {
        update(value);
      }

      return Reflect.set(ref, key, value);
    },
  }));

  return ref.current;
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
  runtimeDOMBailTypes: Node | Window
}

export type UnwrapRef<T> = T extends Ref<infer V>
    ? UnwrapRefSimple<V>
    : UnwrapRefSimple<T>

type BaseTypes = string | number | boolean
type CollectionTypes = IterableCollections | WeakCollections
type IterableCollections = Map<any, any> | Set<any>
type WeakCollections = WeakMap<any, any> | WeakSet<any>

export type UnwrapRefSimple<T> = T extends
  | Function
  | CollectionTypes
  | BaseTypes
  | Ref
  | RefUnwrapBailTypes[keyof RefUnwrapBailTypes]
  | { [RawSymbol]?: true }
  ? T
  : T extends Array<any>
    ? { [K in keyof T]: UnwrapRefSimple<T[K]> }
    : T extends object /*& { [ShallowReactiveMarker]?: never }*/
      ? {
        [P in keyof T]: P extends symbol ? T[P] : UnwrapRef<T[P]>
      }
      : T
