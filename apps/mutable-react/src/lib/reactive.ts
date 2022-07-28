import { Dispatch, useRef, useState } from "react";

export const isReactiveKey = Symbol('isReactive');
export type Reactive<Type extends {}> = Type & { [isReactiveKey]: boolean };
export type ReactiveState<Type extends {}> = Record<keyof Type, ReactiveStateValue<Type>>;
export type ReactiveStateValue<Type extends {}> = [Type[keyof Type], Dispatch<Type[keyof Type]>]

export function reactive<Type extends Record<string | symbol, unknown>>(initialValue: Type): Reactive<Type> {
  const keys: (keyof Type)[] = Object.keys(initialValue);
  const [state, update] = useState(initialValue);
  const target = { ...state, [isReactiveKey]: true };

  const ref = useRef(new Proxy<Reactive<Type>>(target, {
    set(reactive, key, value) {
      if (keys.includes(key)) {
        update({ ...state, [key]: value });
      }

      return Reflect.set(reactive, key, value);
    },
  }));

  return ref.current;
}
