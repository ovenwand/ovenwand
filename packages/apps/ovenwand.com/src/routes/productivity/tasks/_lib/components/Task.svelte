<script lang="ts">
	import { createClassName } from '@ovenwand/util.browser';
	import { draggable } from '@ovenwand/util.svelte';
	import { Sheet } from '@ovenwand/ui.sheet';
	import { createEventDispatcher } from 'svelte';

	export let id: string;
	export let title: string;
	export let description: string;
	export let done: boolean;

	const dispatch = createEventDispatcher();

	let taskClassName: string;

	$: taskClassName = createClassName({
		'mb-2': true,
		'line-through': done
	});
</script>

<div id="task-{id}" class="contents" use:draggable on:dragstart on:dragend on:click>
	<Sheet class={taskClassName} background padding rounded shadow>
		<input
			type="checkbox"
			bind:checked={done}
			on:input={({ target }) => dispatch('update', { done: target.checked })}
		/>
		<h3>{title}</h3>
		<p>{description}</p>
	</Sheet>
</div>
