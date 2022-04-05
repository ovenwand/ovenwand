<script lang="ts">
	import { droppable } from '$lib/util/svelte';
	import { Sheet } from '$lib/components/sheet';
	export let title: string;
</script>

<div class="contents" use:droppable on:dragenter on:dragover on:dragleave>
	<Sheet class="bg-gray-300 dark:bg-gray-900 min-h-full p-2" rounded>
		<h2 class="pb-2">{title}</h2>
		<slot />
	</Sheet>
</div>
