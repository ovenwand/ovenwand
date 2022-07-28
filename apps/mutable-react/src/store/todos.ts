import { useStore } from "../lib/store";

export interface Todo {
  title: string;
  done: boolean;
}

export function useTodoStore(initialState: Todo[]) {
  const { state: todos, commit, mutations } = useStore(initialState);

  function add(todo: Todo) {
    commit(mutations.add(todo));
  }

  function toggle(todo: Todo) {
    todo.done = !todo.done;
    commit(mutations.update(todo));
  }

  return {
    todos,
    add,
    toggle,
  }
}
