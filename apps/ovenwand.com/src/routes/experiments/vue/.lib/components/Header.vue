<script lang="ts" setup>
import { useTodos } from '../store';
const { addTodo } = useTodos();
</script>

<template>
  <header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      autofocus
      placeholder="What needs to be done?"
      @keyup.enter="({ target }) => addTodo(target.value.trim())"
    >
  </header>
</template>