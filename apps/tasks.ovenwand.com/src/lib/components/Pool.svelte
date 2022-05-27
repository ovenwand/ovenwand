<script lang="ts">
	import { createClassName, droppable } from '@ovenwand/util';
	import { Sheet } from '@ovenwand/ui';

	export let title: string;

	let highlight = false;

	$: sheetClassName = createClassName({
		'bg-gray-300 dark:bg-gray-900': !highlight,
		'bg-gray-400 dark:bg-gray-800': highlight,
		'min-h-full p-2': true
	});
</script>

<div
	class="contents"
	use:droppable
	on:dragenter
	on:dragenter={() => (highlight = true)}
	on:dragover
	on:dragleave
	on:dragleave={() => (highlight = false)}
	on:drop
	on:drop={() => (highlight = false)}
>
	<Sheet class={sheetClassName} rounded>
		{#if title}
			<h2 class="text-lg font-bold pb-2">{title}</h2>
		{/if}

		<slot />
	</Sheet>
</div>
