<script lang="ts" setup>
import { useTodos } from '../store';
import TodoItem from './TodoItem.vue';

const { todos, filteredTodos, remaining, toggleAll } = $(useTodos());
</script>

<template>
	<section class="main" v-show="todos.length">
		<input
			id="toggle-all"
			class="toggle-all"
			type="checkbox"
			:checked="remaining === 0"
			@change="({ target }) => toggleAll(target.checked)"
		/>
		<label for="toggle-all">Mark all as complete</label>
		<ul class="todo-list">
			<TodoItem v-for="todo in filteredTodos" :todo="todo">
				{{ todo.title }}
			</TodoItem>
		</ul>
	</section>
</template>
