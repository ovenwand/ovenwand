<script lang="ts">
	import { expand } from '@ovenwand/util.svelte';
	import Sidebar from '@ovenwand/ui.sidebar';
	import { useMedia } from '@ovenwand/util.svelte';

	const { orientation } = useMedia();

	const expandIn = expand;
	const expandOut = expand;

	export let active = false;

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
</script>

<Sidebar expand={active} {expandIn} {expandInOptions} {expandOut} {expandOutOptions}>
	<slot />

	<svelte:fragment slot="expand">
		<slot name="expand" />
	</svelte:fragment>
</Sidebar>

<style lang="postcss" global>
	/*
	.ow-sidebar {
		background-color: red;
	}

	.ow-sidebar__content a {
		flex: 1 0 auto;
	}

	.ow-sidebar__expand {
		flex: 1 1 999rem;
		overflow: auto;
	}

	.ow-sidebar__expand > .grid {
		position: relative;
	}

	.ow-sidebar__expand > .grid > .column > .grid + .grid {
		left: var(--ow-gap);
		position: absolute;
		top: var(--ow-gap);
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

		.ow-sidebar__expand.ow-sidebar__expand {
			width: 50vw; /* Forces the element to respect the flex-basis in landscape */
	/*}
	}
	*/
</style>
