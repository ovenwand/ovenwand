import { isRef, get, set } from './ref';
import { createScope, useScope } from './scope';

export function setup<Setup extends (...args: any[]) => any>(setup: Setup) {
	const {} = useScope(
		createScope() // Create a new scope for every component
	);

	const state = setup();

	return state;
}

// export function setup<Type extends () => {}>(setup: Type) {
//   const state = setup();
//
//   const proxy = new Proxy(state, {
//     get(target, key) {
//       const value = Reflect.get(target, key);
//
//       if (isRef(value)) {
//         return get(value);
//       }
//
//       return value;
//     },
//     set(target, key, value) {
//       const previousValue = target[key];
//
//       if (isRef(previousValue)) {
//         return set(previousValue, value);
//       }
//
//       return Reflect.set(target, key, value);
//     },
//   });
//
//   return proxy;
// }
