<script lang="ts">
	import type { Blok, NodeType } from './types';
	import Heading from './Heading.svelte';
	import Paragraph from './Paragraph.svelte';
	import CodeBlock from './CodeBlock.svelte';
	import Text from './Text.svelte';

	export let blok: Blok | Blok[];

	const components = {
		heading: Heading,
		paragraph: Paragraph,
		code_block: CodeBlock
	};

	function hasType(blok: Blok, type: NodeType): boolean {
		return blok.type === type;
	}
</script>

{#if hasType(blok, 'doc')}
	<svelte:self blok={blok.content} />
{:else if hasType(blok, 'text')}
	<Text marks={blok.marks} text={blok.text} />
{:else if Array.isArray(blok)}
	{#each blok as node}
		<svelte:self blok={node} />
	{/each}
{:else}
	<svelte:component this={components[blok.type]} {...blok.attrs || {}}>
		<svelte:self blok={blok.content} />
	</svelte:component>
{/if}
