<script lang="ts" setup>
import { useTodos, type Todo } from '../store';

const { todo } = defineProps<{ todo: Todo }>();
const { editedTodo, cancelEdit, doneEdit, editTodo, removeTodo } = useTodos();
</script>

<template>
  <li
    class="todo"
    :key="todo.id"
    :class="{ completed: todo.completed, editing: todo === editedTodo }"
  >
    <div class="view">
      <label @dblclick="editTodo(todo)">
        <input class="toggle" type="checkbox" v-model="todo.completed">
        {{ todo.title }}
      </label>
      <button class="destroy" @click="removeTodo(todo)"></button>
    </div>
    <input
      v-if="todo === editedTodo"
      class="edit"
      type="text"
      v-model="todo.title"
      @vnode-mounted="({ el }) => el.focus()"
      @blur="doneEdit(todo)"
      @keyup.enter="doneEdit(todo)"
      @keyup.escape="cancelEdit(todo)"
    >
  </li>
</template>
