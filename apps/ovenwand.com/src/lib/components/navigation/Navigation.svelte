<script lang="ts">
	import { createClassName } from '@ovenwand/util';
	// import { useSidebar } from '@ovenwand/ui';

	let className: string | null = null;
	export { className as class };

	// const store = useSidebar();

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
		}
		// {
		// 	label: '::',
		// 	action: store.expand
		// }
	];

	$: navClassName = createClassName({
		[className as string]: className
	});
</script>

<nav class="flex {navClassName}">
	<ul class="flex">
		{#each items as item}
			<li class="flex items-center px-4">
				{#if item.href}
					<a href={item.href}>
						{item.label}
					</a>
					<!--{:else}-->
					<!--	<button on:click={() => item.action()}>-->
					<!--		{item.label}-->
					<!--	</button>-->
				{/if}
			</li>
		{/each}
	</ul>
	<slot />
</nav>
