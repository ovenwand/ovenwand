<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { createClassName, draggable } from '@ovenwand/util';
	import { Sheet } from '@ovenwand/ui';
	import type { ITask } from '$lib/models';

	export let task: ITask;
	export let href: string | null = null;
	export let placeholder = false;
	export let interactive = true;
	export let highlight = false;

	const dispatch = createEventDispatcher();

	let _id: string;
	let title: string;
	let description: string;
	let order: number;
	let status: 'open' | 'closed';

	let isMouseDown = false;
	let taskClassName: string;

	$: ({ _id, title, description, order, status } = task);

	$: taskTagName = href ? 'a' : 'div';

	$: taskClassName = createClassName({
		'line-through': status === 'closed',
		'bg-gray-200 dark:bg-gray-800': highlight,
		'cursor-grab': interactive && !isMouseDown,
		'cursor-grabbing': interactive && isMouseDown
	});

	$: titleClassName = createClassName({
		'w-44 bg-white leading-none my-1': placeholder
	});

	$: descriptionClassName = createClassName({
		'w-60 bg-white leading-none my-1': placeholder
	});

	$: closed = status === 'closed';

	function onInput(event: Event) {
		const target = event.target as HTMLInputElement;
		dispatch('update', { status: target.checked ? 'closed' : 'open' });
	}
</script>

<svelte:element
	this={taskTagName}
	id="task-{_id.slice(-5)}"
	class="contents"
	{href}
	use:draggable={{ disabled: !interactive }}
	on:mousedown={() => (isMouseDown = true)}
	on:mouseup={() => (isMouseDown = false)}
	on:dragstart
	on:dragend
	on:click
>
	<Sheet class="flex mb-2 {taskClassName}" background={!highlight} padding rounded shadow>
		<div class="flex pr-4 items-center justify-center">
			<input id="task-input-{_id}" type="checkbox" bind:checked={closed} on:input={onInput} />
		</div>
		<div class="flex flex-col flex-auto items-start">
			<label for="task-input-{_id}" class={titleClassName}>{title}</label>
			<span class={descriptionClassName}>{description}</span>
		</div>
	</Sheet>
</svelte:element>
