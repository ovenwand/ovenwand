<script lang="ts">
	export let marks: { type: string }[] = [];
	export let text: string | null;

	function hasMark(type: string): boolean {
		return !!marks.find((mark) => mark.type === type);
	}
</script>

{#if hasMark('bold')}
	<b>{text}</b>
{:else if hasMark('italic')}
	<i>{text}</i>
{:else if hasMark('code')}
	<code>{text}</code>
{:else}
	{text}
{/if}
