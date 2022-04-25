<script lang="ts">
	import { createClassName } from '@ovenwand/util.browser';
	export let header = false;
	export let footer = false;

	$: appClassName = createClassName({
		'min-h-screen bg-center bg-cover grid': true,
		'has-header': header,
		'has-footer': footer
	});
</script>

<div id="app" class={appClassName}>
	{#if header}
		<slot name="before-content" />
	{/if}

	<main>
		<slot />
	</main>

	{#if footer}
		<slot name="after-content" />
	{/if}
</div>

<slot name="outside" />

<style lang="postcss">
	#app {
		background-image: url(/background.png);
	}

	#app.has-header {
		grid-template-rows: min-content 1fr;
	}

	#app.has-footer {
		grid-template-rows: 1fr min-content;
	}

	#app.has-header.has-footer {
		grid-template-rows: min-content 1fr min-content;
	}
</style>
