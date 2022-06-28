<script lang="ts">
	import { createClassName } from '@ovenwand/util.browser';
	import Base from './BaseLayout.svelte';

	let className: string | null = null;
	export { className as class };

	export let header = false;
	export let footer = false;

	let appClassName: string;

	$: appClassName = createClassName({
		[className as string]: className,
		'auto-rows-[min-content_1fr]': header && !footer,
		'auto-rows-[1fr_min-content]': footer && !header,
		'auto-rows-[min-content_1fr_min-content]': header && footer
	});
</script>

<Base>
	<div id="app" class="min-h-screen grid {appClassName}">
		{#if header}
			<slot name="before-content" />
		{/if}

		<main class="min-h-0 overflow-auto">
			<slot />
		</main>

		{#if footer}
			<slot name="after-content" />
		{/if}
	</div>

	<slot name="outside" />
</Base>
