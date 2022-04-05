<script lang="ts">
	import { draggable } from '$lib/util/svelte';
	import { Sheet } from '$lib/components/sheet';
	import { createClassName } from '../../../lib/util';

	export let title: string;
	export let description: string;
	export let done = false;

	$: taskClassName = createClassName({
		'bg-gray-100': true,
		'dark:bg-gray-800': true,
		'mb-2': true,
		'line-through': done
	});
</script>

<div class="contents" use:draggable on:dragstart on:dragend>
	<Sheet class={taskClassName} padding rounded shadow>
		<input type="checkbox" bind:checked={done} />
		<h3>{title}</h3>
		<p>{description}</p>
	</Sheet>
</div>
