import { computed, readonly, ref, type Ref } from 'vue';

const filters = {
	all: (todos: Todo[]) => todos,
	active: (todos: Todo[]) => todos.filter((todo) => !todo.completed),
	completed: (todos: Todo[]) => todos.filter((todo) => todo.completed)
};

// state
const editedTodo = ref();
const todos: Ref<Todo[]> = ref([]);
const visibility: Ref<keyof typeof filters> = ref('all');

// derived state
const filteredTodos = computed(() => filters[visibility.value](todos.value));
const remaining = computed(() => filters.active(todos.value).length);

function toggleAll(completed: boolean) {
	todos.value.forEach((todo) => (todo.completed = completed));
}

function addTodo(value: string) {
	todos.value.push({
		id: Date.now(),
		title: value,
		completed: false
	});
}

function removeTodo(todo: Todo) {
	todos.value.splice(todos.value.indexOf(todo), 1);
}

function removeCompleted() {
	todos.value = filters.active(todos.value);
}

let beforeEditCache = '';
function editTodo(todo: Todo) {
	beforeEditCache = todo.title;
	editedTodo.value = todo;
}

function cancelEdit(todo: Todo) {
	editedTodo.value = null;
	todo.title = beforeEditCache;
}

function doneEdit(todo: Todo) {
	if (editedTodo.value) {
		editedTodo.value = null;
		todo.title = todo.title.trim();
		if (!todo.title) removeTodo(todo);
	}
}

export interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

export function useTodos(newTodos?: Todo[], newVisibility?: 'all' | 'active' | 'completed') {
	if (newTodos) {
		todos.value = newTodos;
	}

	if (newVisibility) {
		const isFilter = ['all', 'active', 'completed'].includes(newVisibility);
		visibility.value = isFilter ? newVisibility : 'all';
	}

	return {
		todos,
		// todos: readonly(todos),
		editedTodo,
		filteredTodos,
		remaining,
		visibility,
		filters,
		toggleAll,
		addTodo,
		removeTodo,
		removeCompleted,
		editTodo,
		cancelEdit,
		doneEdit
	};
}
