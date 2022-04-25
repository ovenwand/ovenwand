<script lang="ts">
	import { createClassName } from '@ovenwand/util.browser';
	import { store } from '@ovenwand/ui.sidebar';

	let className: string = null;
	export { className as class };

	const items = [
		{
			label: 'Portfolio',
			href: '/portfolio'
		},
		{
			label: 'About',
			href: '/about'
		},
		{
			label: 'Blog',
			href: '/blog'
		},
		{
			label: '::',
			action: store.expand
		}
	];

	$: navClassName = createClassName({
		flex: true,
		[className]: className
	});
</script>

<nav class={navClassName}>
	<ul class="flex">
		{#each items as item}
			<li class="flex items-center px-4">
				{#if item.href}
					<a href={item.href}>
						{item.label}
					</a>
				{:else}
					<button on:click={() => item.action()}>
						{item.label}
					</button>
				{/if}
			</li>
		{/each}
	</ul>
	<slot />
</nav>
