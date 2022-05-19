<script lang="ts">
	import type { NodeType, RichTextNode } from '../types';
	import Text from './Text.svelte';
	import Heading from './Heading.svelte';
	import Paragraph from './Paragraph.svelte';
	import CodeBlock from './CodeBlock.svelte';

	export let type: NodeType;
	export let content: RichTextNode[] = [];
	export let marks: { type: string }[] = [];
	export let text: string | null = null;
	export let attrs: Record<string, string> = {};

	const components = {
		heading: Heading,
		paragraph: Paragraph,
		code_block: CodeBlock
	};
</script>

{#if type === 'doc'}
	{#each content as node}
		<svelte:self {...node} />
	{/each}
{:else if type === 'text'}
	<Text {marks} {text} />
{:else}
	<svelte:component this={components[type]} {...attrs}>
		{#each content as node}
			<svelte:self {...node} />
		{/each}
	</svelte:component>
{/if}
