<svelte:options accessors />

<script lang="ts">
	import { createClassName } from '@ovenwand/util.browser';

	let className = '';
	export { className as class };
	export let href: string | null = null;
	export let type = 'button';
	export let size: 'default' | 'large' = 'default';
	export let full = false;

	$: isDefaultSize = size === 'default';
	$: isLargeSize = size === 'large';

	$: buttonClassName = createClassName({
		[className]: className,
		block: true,
		'px-2': isDefaultSize,
		'py-3': isDefaultSize,
		'px-4': isLargeSize,
		'py-6': isLargeSize,
		'w-fit': !full,
		'max-w-full': !full,
		'leading-none': true,
		'text-center': true
	});
</script>

{#if href}
	<a class={buttonClassName} {href} data-sveltekit-prefetch on:click {...$$restProps}>
		<slot />
	</a>
{:else}
	<button class={buttonClassName} {type} on:click {...$$restProps}>
		<slot />
	</button>
{/if}
