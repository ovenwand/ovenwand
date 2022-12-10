<script lang="ts">
	import { Button } from '@ovenwand/ui';
	import { Editable, Panel } from '$lib/components';

	export let data: import('./$types').PageLoadData;

	$: task = data.task;
</script>

<Panel>
	<svelte:fragment slot="header">
		<Editable
			tag="h2"
			class="text-lg font-bold leading-10 px-2"
			name="title"
			action="?/saveTask"
			value={task.title}
		/>

		<div class="flex-grow" />

		<Button href={`/explorer/${task._id}/edit`}>Edit</Button>

		<form method="POST" action="?/deleteTask">
			<Button type="submit">Delete</Button>
		</form>
	</svelte:fragment>

	<slot />
</Panel>
