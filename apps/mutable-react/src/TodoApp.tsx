import { component } from './lib';
import { useTodoStore } from './store/todos';
import { FormEvent } from "react";

export default component(
  () => {
    const { todos, add, toggle } = useTodoStore([
      {
        title: 'Foo',
        done: false,
      },
    ]);

    function onSubmit(event: FormEvent) {
      const form = event.target as HTMLFormElement;

      event.preventDefault();

      add({
        title: form['todo.title'].value,
        done: false,
      });
    }

    return {
      todos,
      onSubmit,
      toggle,
    };
  },
  ({ todos, onSubmit, toggle }) => {

    return (
      <>
        <h1>Todo</h1>

        <form onSubmit={onSubmit}>
          <input type="text" name="todo.title" />
          <button type="submit">Add</button>
        </form>

        {todos.map((todo) =>
          <div key={todo.title}>
            <label>
              <input
                type="checkbox"
                name="test"
                checked={todo.done}
                onChange={() => toggle(todo)}
              />
              {todo.title}
            </label>
          </div>
        )}
      </>
    );
  },
);
