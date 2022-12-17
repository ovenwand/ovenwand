<script lang="ts">
	import { createClassName } from '@ovenwand/util';
	import { Sheet } from '@ovenwand/ui';
	import { useTransition } from '$lib/transitions/use-transition';

	let className = '';
	export { className as class };

	export let transitions = null;

	export let title = '';
	export let highlight = false;

	export let header = Boolean($$slots.header || title);
	export let footer = Boolean($$slots.footer);

	$: sheetClassName = createClassName({
		[className]: className,
		'bg-gray-300 dark:bg-gray-900': !highlight,
		'bg-gray-400 dark:bg-gray-800': highlight,
		'flex flex-col': true
	});

	$: headerClassName = createClassName({
		flex: true,
		'p-2': header
	});

	$: contentClassName = createClassName({
		'flex-grow': true
	});

	$: footerClassName = createClassName({
		'p-2': footer
	});

	$: ({
		inTransition: headerInTransition,
		inOptions: headerInOptions,
		outTransition: headerOutTransition,
		outOptions: headerOutOptions
	} = useTransition(transitions?.header));

	$: ({
		inTransition: contentInTransition,
		inOptions: contentInOptions,
		outTransition: contentOutTransition,
		outOptions: contentOutOptions
	} = useTransition(transitions?.content));

	$: ({
		inTransition: footerInTransition,
		inOptions: footerInOptions,
		outTransition: footerOutTransition,
		outOptions: footerOutOptions
	} = useTransition(transitions?.footer));
</script>

<Sheet class={sheetClassName} rounded shadow>
	<!-- these transitions currently break during page transitions. Potentially related: https://github.com/sveltejs/svelte/issues/7904 -->
	<!--{#if header}-->
	<div
		class={headerClassName}
		in:headerInTransition={headerInOptions}
		out:headerOutTransition={headerOutOptions}
	>
		{#if title}
			<h2 class="text-lg font-bold leading-10 px-2">{title}</h2>
			<div class="flex-grow" />
		{/if}

		<slot name="header" />
	</div>
	<!--{/if}-->

	<div
		class={contentClassName}
		in:contentInTransition={contentInOptions}
		out:contentOutTransition={contentOutOptions}
	>
		<slot />
	</div>

	<!-- these transitions currently break during page transitions. Potentially related: https://github.com/sveltejs/svelte/issues/7904 -->
	<!--{#if footer}-->
	<div
		class={footerClassName}
		in:footerInTransition={footerInOptions}
		out:footerOutTransition|local={footerOutOptions}
	>
		<slot name="footer" />
	</div>
	<!--{/if}-->
</Sheet>
