import { ref } from "./ref";

export function useStore<Type extends unknown[]>(initialState: Type) {
  const state = ref(initialState);

  function commit(mutation: (state: Type) => Type) {
    return state.current = mutation(state.current);
  }

  // function dispatch(action: (context: { state: Type, commit: (mutation: (state: Type) => Type) => Type }) => Promise<unknown>) {
  //   return action({ state: state.current, commit });
  // }

  const mutations = {
    add: (instance: Type[keyof Type]) => (state: Type) => [
      ...state,
      instance,
    ],
    update: (instance: Type[keyof Type]) => (state: Type) => [
      ...state.slice(0, state.indexOf(instance)),
      instance,
      ...state.slice(state.indexOf(instance) + 1),
    ],
    remove: (instance: Type[keyof Type]) => (state: Type) => [
      ...state.filter((i) => i !== instance),
    ],
    clear: () => [],
  };

  return { state, commit, /*dispatch,*/ mutations };
}
