<script lang="ts">
	import { createClassName } from '@ovenwand/util.dom';
	import { expand as expandTransition } from '@ovenwand/util.svelte';
	import type { SidebarStore } from './store';
	import { store, DEFAULT_ID } from './store';

	export let id: string = DEFAULT_ID;
	let className = '';
	export { className as class };
	export let expand = false;
	export let expandIn = expandTransition;
	export let expandOut = expandTransition;
	export let expandInOptions = { duration: 400 };
	export let expandOutOptions = { delay: 150, duration: 400 };
	export let reverse = false;

	const namespace = 'ow-sidebar';
	const sidebar: SidebarStore = store.add(id, { expand });

	$: containerClassName = createClassName({
		[`${namespace}`]: true,
		[`${className}`]: className
	});

	$: contentClassName = createClassName({
		[`${namespace}__content`]: true
	});

	$: expandClassName = createClassName({
		[`${namespace}__expand`]: true
	});

	$: if (expand) {
		sidebar.expand();
	} else {
		sidebar.contract();
	}
</script>

<div {id} class={containerClassName}>
	{#if !reverse}
		<div class={contentClassName}>
			<slot />
		</div>
	{/if}

	{#if $sidebar.expand}
		<div class={expandClassName} in:expandIn={expandInOptions} out:expandOut={expandOutOptions}>
			<slot name="expand" />
		</div>
	{/if}

	{#if reverse}
		<div class={contentClassName}>
			<slot />
		</div>
	{/if}
</div>

<style>
	.ow-sidebar {
		display: flex;
		height: 100%;
	}

	.ow-sidebar__content {
		display: flex;
		flex-direction: column;
	}
</style>
