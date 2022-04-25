<script lang="ts">
	import { createClassName } from '@ovenwand/util.browser';

	let className: string;
	export { className as class };

	const items = [
		{
			label: 'Experiments',
			href: '/experiments/pendulum'
		},
		{
			label: 'Tasks',
			href: '/productivity/tasks'
		}
	];

	$: navClassName = createClassName({
		flex: true,
		[className]: className
	});
</script>

<nav class={navClassName}>
	<ul>
		{#each items as item}
			<li class="flex items-center">
				{#if item.href}
					<a href={item.href} on:click>
						{item.label}
					</a>
				{:else}
					<button on:click={() => item.action()} on:click>
						{item.label}
					</button>
				{/if}
			</li>
		{/each}
	</ul>
	<slot />
</nav>
