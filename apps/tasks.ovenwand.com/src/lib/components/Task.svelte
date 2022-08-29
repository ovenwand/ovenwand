<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { createClassName, draggable } from '@ovenwand/util';
	import { Sheet } from '@ovenwand/ui';

	export let _id: string;
	export let title: string;
	export let description: string;
	export let done: boolean;

	export let href: string | null = null;
	export let placeholder = false;
	export let interactive = true;
	export let highlight = false;

	const dispatch = createEventDispatcher();

	let isMouseDown = false;
	let taskClassName: string;

	$: taskTagName = href ? 'a' : 'div';

	$: taskClassName = createClassName({
		'line-through': done,
		'bg-gray-200 dark:bg-gray-800': highlight,
		'cursor-grab': interactive && !isMouseDown,
		'cursor-grabbing': interactive && isMouseDown,
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

<svelte:element
	this={taskTagName}
	id="task-{_id}"
	class="contents"
	{href}
	use:draggable={{ disabled: !interactive }}
	on:mousedown={() => isMouseDown = true}
	on:mouseup={() => isMouseDown = false}
	on:dragstart
	on:dragend
	on:click
>
	<Sheet class="flex mb-2 {taskClassName}" background={!highlight} padding rounded shadow>
		<div class="flex pr-4 items-center justify-center">
			<input id="task-input-{_id}" type="checkbox" bind:checked={done} on:input={onInput} />
		</div>
		<div class="flex flex-col flex-auto items-start">
			<label for="task-input-{_id}" class={titleClassName}>{title}</label>
			<span class={descriptionClassName}>{description}</span>
		</div>
	</Sheet>
</svelte:element>
