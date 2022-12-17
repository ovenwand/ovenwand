<script lang="ts">
	import TaskActionButton from './TaskActionButton.svelte';

	export let id: string;
	export let label = 'Done';
</script>

<TaskActionButton action="?/markDone" {id} {label} />
