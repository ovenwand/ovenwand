<script lang="ts">
	import ActionButton from './ActionButton.svelte';
	export let id: string;
	export let action: string;
	export let label: string;
</script>

<ActionButton {action} {label}>
	<input type="hidden" name="id" value={id} />
</ActionButton>
