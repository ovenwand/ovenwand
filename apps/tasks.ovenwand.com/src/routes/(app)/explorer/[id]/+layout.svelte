<script lang="ts">
	import { Button } from '@ovenwand/ui';
	import { route } from '$lib/route';
	import { DeleteTaskButton, Editable, Panel } from '$lib/components';

	export let data: import('./$types').PageLoadData;

	$: task = data.task;
</script>

<Panel class="min-h-full">
	<svelte:fragment slot="header">
		<Editable
			tag="h2"
			class="text-lg font-bold leading-10 px-2"
			name="title"
			action="?/saveTask"
			value={task.title}
		/>

		<div class="flex-grow" />

		<Button href={route('/explorer/[id]/edit', { id: task._id })}>Edit</Button>

		<DeleteTaskButton />
	</svelte:fragment>

	<slot />
</Panel>
