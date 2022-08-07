<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { createClassName, draggable } from '@ovenwand/util';
	import { Sheet } from '@ovenwand/ui';

	export let _id: string;
	export let title: string;
	export let description: string;
	export let done: boolean;
	export let placeholder = false;

	const dispatch = createEventDispatcher();

	let taskClassName: string;

	$: taskClassName = createClassName({
		'line-through': done
	});

	$: titleClassName = createClassName({
		'w-44 bg-white leading-none my-1': placeholder
	});

	$: descriptionClassName = createClassName({
		'w-60 bg-white leading-none my-1': placeholder
	});

	function onInput(event: Event) {
		const target = event.target as HTMLInputElement;
		dispatch('update', { done: target.checked });
	}
</script>

<div id="task-{_id}" class="contents" use:draggable on:dragstart on:dragend on:click>
	<Sheet class="flex mb-2 {taskClassName}" background padding rounded shadow>
		<div class="flex pr-4 items-center justify-center">
			<input type="checkbox" bind:checked={done} on:input={onInput} />
		</div>
		<div class="flex flex-col flex-auto items-start">
			<span class={titleClassName}>{title}</span>
			<span class={descriptionClassName}>{description}</span>
		</div>
	</Sheet>
</div>
