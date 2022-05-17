<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	export let blok;
	export let component;
	export let tag = 'div';
</script>

{#if component}
	<svelte:component this={component} use={[storyblokEditable, blok]} {...blok} {...$$restProps}>
		<slot />
	</svelte:component>
{:else}
	<svelte:element this={tag} use:storyblokEditable={blok} {...$$restProps}>
		<slot />
	</svelte:element>
{/if}
