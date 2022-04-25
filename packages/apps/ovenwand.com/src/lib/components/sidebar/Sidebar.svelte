<script lang="ts">
	import { createClassName } from '@ovenwand/util.browser';
	import { expand, useMedia } from '@ovenwand/util.svelte';
	import Sidebar from '@ovenwand/ui.sidebar';

	export let id: string = undefined;
	export let active = false;
	export let absolute = true;

	const { orientation } = useMedia();

	const expandIn = expand;
	const expandOut = expand;

	$: expandInOptions = {
		duration: 400,
		axis: $orientation === 'portrait' ? 'y' : 'x',
		x: 'max-width',
		y: 'max-height'
	};
	$: expandOutOptions = {
		delay: 300,
		axis: $orientation === 'portrait' ? 'y' : 'x',
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

<style lang="postcss" global>
	.ow-sidebar__content a {
		flex: 1 0 auto;
	}

	@media screen and (orientation: portrait) {
		.ow-sidebar.ow-sidebar {
			flex-direction: column;
			max-height: 50vh;
		}

		.ow-sidebar__content.ow-sidebar__content {
			flex-direction: row;
		}
	}

	@media screen and (orientation: landscape) {
		.ow-sidebar.ow-sidebar {
			max-width: 50vw;
		}
	}
</style>
