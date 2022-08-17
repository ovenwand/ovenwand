<script lang="ts">
	import { onDestroy } from 'svelte';
	import * as navigation from '$app/navigation';
	import { page } from '$app/stores';
	import { createClientApp } from '../.lib/app.ts';
	import { useContext as useVueContext } from '../.lib/store/context';
	import App from '../.lib/App.vue';

	const [setVueContext] = useVueContext();

	export let data: import('./$types').LoadData;

	const { mount, destroy } = createClientApp(App, null, {
		navigation: { ...navigation },
		page: $page,
		data: data.data,
	});

	const htmlCache = data.html;

	let container: HTMLDivElement;

	$: mount(container);
	$: setVueContext('page', $page);
	$: setVueContext('data', data);

	onDestroy(destroy);
</script>

<div bind:this={container} id="vue-app">
	{@html htmlCache}
</div>
