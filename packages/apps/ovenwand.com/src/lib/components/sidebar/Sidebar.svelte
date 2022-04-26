<script lang="ts">
	import { createClassName } from '@ovenwand/util.browser';
	import { expand, useMedia } from '@ovenwand/util.svelte';
	import Sidebar from '@ovenwand/ui.sidebar';

	export let id: string = undefined;
	export let active = false;
	export let absolute = true;

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
		'absolute top-0 right-0': absolute
	});
</script>

<Sidebar
	class={sidebarClassName}
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
