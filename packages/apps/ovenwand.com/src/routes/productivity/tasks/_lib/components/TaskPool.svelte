<script lang="ts">
	import { Loader } from '$lib/components';
	import type { ITask } from '../store';
	import Pool from './Pool.svelte';

	export let title: string;
	export let tasks: ITask[];
	export let loading = false;
</script>

<Pool {title} on:dragenter on:dragleave on:drop>
	<Loader {loading}>
		{#each tasks as task (task._id)}
			<slot {task} />
		{/each}
	</Loader>
	{#if !tasks.length}
		No tasks yet :)
	{/if}
</Pool>
