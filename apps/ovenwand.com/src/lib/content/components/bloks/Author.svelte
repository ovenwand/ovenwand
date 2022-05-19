<script lang="ts">
	import type { Action } from 'svelte/action';

	export let use: [Action, unknown];
	export let name: string;
	export let title: string;

	let action: Action, params: unknown;

	$: [action, params] = use;
</script>

<div use:action={params}>
	<h2>{name}</h2>

	{#if title}
		<span>{title}</span>
	{/if}
</div>
