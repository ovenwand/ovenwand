<script lang="ts">
	import { createClassName } from '@ovenwand/util.browser';
	export let href: string | null = null;
	export let type = 'button';

	const buttonClassName = createClassName({
		block: true,
		'px-2': true,
		'py-2': true,
		'leading-none': true,
		'text-center': true
	});
</script>

{#if href}
	<a class={buttonClassName} {href} sveltekit:prefetch on:click {...$$restProps}>
		<slot />
	</a>
{:else}
	<button class={buttonClassName} {type} on:click {...$$restProps}>
		<slot />
	</button>
{/if}
