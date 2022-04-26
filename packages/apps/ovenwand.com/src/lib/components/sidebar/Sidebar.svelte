<script lang="ts">
	import { createClassName } from '@ovenwand/util.browser';
	import { expand, useMedia } from '@ovenwand/util.svelte';
	import Sidebar from '@ovenwand/ui.sidebar';

	export let id: string = undefined;
	export let active = false;
	export let absolute = true;
	export let left = false;
	export let right = false;
	export let bottom = false;
	export let top = false;

	const { portrait } = useMedia();

	const expandIn = expand;
	const expandOut = expand;

	$: expandInOptions = {
		duration: 400,
		axis: $portrait ? 'y' : 'x',
		x: 'max-width',
		y: 'max-height'
	};
	$: expandOutOptions = {
		delay: 300,
		axis: $portrait ? 'y' : 'x',
		x: 'max-width',
		y: 'max-height'
	};

	$: sidebarClassName = createClassName({
		absolute: absolute,
		'top-0': top,
		'right-0': right,
		'bottom-0': bottom,
		'left-0': left
	});
</script>

<Sidebar
	class="h-auto landscape:h-full {sidebarClassName}"
	bind:id
	bind:expand={active}
	{expandIn}
	{expandInOptions}
	{expandOut}
	{expandOutOptions}
>
	<slot />

	<svelte:fragment slot="expand">
		<slot name="expand" />
	</svelte:fragment>
</Sidebar>
