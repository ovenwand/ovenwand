<script lang="ts">
	import { droppable } from '@ovenwand/util';
	import Panel from "./Panel.svelte";

	let className = '';
	export { className as class };

	export let title: string;

	let highlight = false;
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
	<Panel class={className} {highlight} {title}>
		<slot />

		<svelte:fragment slot="footer">
			<slot name="footer" />
		</svelte:fragment>
	</Panel>
</div>
