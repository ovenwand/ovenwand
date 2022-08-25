import { useId, useRef } from 'react';
import { isRefKey, type Ref } from './ref';
import { useTracker } from './tracker';

type CustomRefHandle<Type> = (
	track: (value: Type) => void,
	trigger: (value: Type) => void
) => {
	get: () => Type;
	set: (value: Type) => void;
};

export function customRef<Type>(initialValue: Type, handle: CustomRefHandle<Type>): Ref<Type> {
	const target = { current: initialValue, [isRefKey]: true };
	const [track, trigger] = useTracker();

	const {
		current: { get, set }
	} = useRef(handle(track, trigger));

	const proxy = new Proxy<Ref<Type>>(target, {
		get(target, key) {
			if (key === 'current') {
				return get();
			}

			return Reflect.get(target, key);
		},
		set(target, key, value) {
			const result = Reflect.set(target, key, value);

			if (key === 'current') {
				set(value);
			}

			return result;
		}
	});

	return useRef(proxy).current;
}
