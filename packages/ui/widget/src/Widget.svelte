<script lang="ts">
	import { Action } from 'svelte/action';
	import { draggable, droppable } from '@ovenwand/util.svelte';

	export let type: string;

	let action: Action = null;

	$: switch (type) {
		case 'draggable':
			action = draggable;
			break;
		case 'droppable':
			action = droppable;
			break;
	}
</script>

<div class="contents" use:action on:dragenter on:dragover on:dragleave on:drop>
	<slot />
</div>
