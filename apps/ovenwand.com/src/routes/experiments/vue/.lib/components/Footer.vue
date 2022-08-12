<script lang="ts" setup>
import { useTodos } from '../store';

const { todos, remaining, visibility, removeCompleted } = $(useTodos());
</script>

<template>
	<footer class="footer" v-show="todos.length">
		<span class="todo-count">
			<strong>{{ remaining }}</strong>
			<span>{{ remaining === 1 ? 'item' : 'items' }} left</span>
		</span>
		<ul class="filters">
			<li>
				<a href="/experiments/vue/all" :class="{ selected: visibility === 'all' }"> All </a>
			</li>
			<li>
				<a href="/experiments/vue/active" :class="{ selected: visibility === 'active' }">
					Active
				</a>
			</li>
			<li>
				<a href="/experiments/vue/completed" :class="{ selected: visibility === 'completed' }">
					Completed
				</a>
			</li>
		</ul>
		<button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
			Clear completed
		</button>
	</footer>
</template>
