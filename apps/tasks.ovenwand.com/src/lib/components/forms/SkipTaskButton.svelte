<script lang="ts">
	import TaskActionButton from './TaskActionButton.svelte';

	export let id: string;
	export let label = 'Skip';
</script>

<TaskActionButton action="?/markSkipped" {id} {label} />
