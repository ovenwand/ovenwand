<script lang="ts">
	import { createClassName } from '@ovenwand/util';
	import { Loader } from '@ovenwand/ui';
	import type { ITask } from '../store';
	import Pool from './Pool.svelte';

	let className: string | null = null;
	export { className as class };

	export let title: string | null = null;
	export let tasks: ITask[];
	export let loading = false;

	$: poolClassName = createClassName({
		[className as string]: className
	});
</script>

<Pool class="flex flex-col {poolClassName}" {title} on:dragenter on:dragleave on:drop>
	<div class="flex-grow overflow-auto">
		<Loader {loading}>
			{#each tasks as task}
				<slot {task} />
			{/each}
		</Loader>

		{#if !tasks.length}
			No tasks yet :)
		{/if}
	</div>

	<svelte:fragment slot="footer">
		{#if $$slots.footer}
			<div class="p-2">
				<slot task={null} name="footer" />
			</div>
		{/if}
	</svelte:fragment>
</Pool>
