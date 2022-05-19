<script lang="ts">
	import { createClassName } from '@ovenwand/util';

	let className: string | null = null;
	export { className as class };

	const items: { label: string; href?: string; action?: () => unknown }[] = [
		{
			label: 'Experiments',
			href: '/experiments/pendulum'
		},
		{
			label: 'Tasks',
			href: '/productivity/tasks'
		}
	];

	let navClassName: string;

	$: navClassName = createClassName({
		[className as string]: className
	});
</script>

<nav class="flex {navClassName}">
	<ul>
		{#each items as item}
			<li class="flex items-center">
				{#if item.href}
					<a href={item.href} on:click>
						{item.label}
					</a>
					<!--{:else if item.action}-->
					<!--	<button on:click={() => item.action()} on:click>-->
					<!--		{item.label}-->
					<!--	</button>-->
				{/if}
			</li>
		{/each}
	</ul>
	<slot />
</nav>
