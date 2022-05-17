<script lang="ts">
	export let marks: { type: string }[] = [];
	export let text: string;

	function hasMark(type: string): boolean {
		return !!marks.find((mark) => mark.type === type);
	}
</script>

{#if hasMark('code')}
	<code>{text}</code>
{:else}
	{text}
{/if}
