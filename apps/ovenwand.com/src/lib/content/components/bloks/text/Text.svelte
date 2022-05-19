<script lang="ts">
	import type { Action } from 'svelte/action';
	import type { DocNode } from './types';
	import { RichText } from './nodes';

	export let use: [Action, unknown];
	export let content: DocNode;

	let action: Action, params: unknown;

	$: [action, params] = use;
</script>

<div use:action={params}>
	<RichText {...content} />
</div>
