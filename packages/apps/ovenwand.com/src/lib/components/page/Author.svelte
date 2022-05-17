<script lang="ts">
	import type { Action } from 'svelte/action';

	export let use: [Action, unknown];
	export let name: string;
	export let title: string;

	$: action = use[0];
	$: params = use[1];
</script>

<div use:action={params}>
	<h2>{name}</h2>

	{#if title}
		<span>{title}</span>
	{/if}
</div>

<!--<script lang="ts">-->
<!--	import { storyblokEditable } from '@storyblok/svelte';-->

<!--	export let blok;-->
<!--</script>-->

<!--<div use:storyblokEditable={blok}>-->
<!--	<h2>{blok.name}</h2>-->
<!--	{#if blok.title}-->
<!--		<span>{blok.title}</span>-->
<!--	{/if}-->
<!--</div>-->
