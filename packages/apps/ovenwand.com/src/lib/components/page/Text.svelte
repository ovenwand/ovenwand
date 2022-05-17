<script lang="ts">
	import { RichText } from '$lib/components/typography';
	import type { Action } from 'svelte/action';

	export let use: [Action, unknown];
	export let content: unknown[];

	$: action = use[0];
	$: params = use[1];
</script>

<div use:action={params}>
	<RichText blok={content} />
</div>
