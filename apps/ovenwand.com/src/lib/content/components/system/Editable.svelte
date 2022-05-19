<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { storyblokEditable as _storyblokEditable } from '@storyblok/svelte';
	import type { Blok } from '../../types';
	import { isBridgeEnabled } from '../../store';

	export let blok: Blok;
	export let component: typeof SvelteComponent;
	export let tag = 'div';

	export function storyblokEditable(node: HTMLElement, parameters: unknown) {
		if (isBridgeEnabled) {
			return _storyblokEditable(node, parameters);
		}
	}
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
