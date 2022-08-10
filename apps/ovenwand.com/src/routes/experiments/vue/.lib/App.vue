<!--
A fully spec-compliant TodoMVC implementation
https://todomvc.com/
-->

<script lang="ts" setup>
import type { Page } from '@sveltejs/kit';
import { inject, onMounted, watchEffect } from 'vue';
import { useTodos } from './store';
import Header from './components/Header.vue';
import Todos from './components/Todos.vue';
import Footer from './components/Footer.vue';

const STORAGE_KEY = 'vue-todomvc';

const page = inject<Page>('page');
const data = inject('data');

let { todos, visibility, filters } = $(useTodos(data.todos, page.params.slug));

// Handle routing
watchEffect(() => {
	const { slug } = page.params;

	if (filters[slug]) {
		visibility = slug as keyof typeof filters;
	} else {
		visibility = 'all';
	}
});

onMounted(() => {
	// Need to wait till the app is mounted before setting the todos from
	// localstorage, otherwise vue complains about hydration mismatched.
	// It is not actually a problem, but not nice? Otherwise the localStorage can
	// be used as the initial value of `todos`, and watchEffect can be moved into
	// a typeof window guard.

	// read persisted state
	todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

	// persist state
	watchEffect(() => {
		localStorage?.setItem(STORAGE_KEY, JSON.stringify(todos));
	});
});
</script>

<template>
	<section class="todoapp">
		<Header />
		<Todos />
		<Footer />
	</section>
</template>
