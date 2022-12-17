<script lang="ts">
	import { Editable } from '$lib/components';

	export let data: import('./$types').PageData;

	$: task = data.task;
</script>

<Editable tag="p" name="description" action="?/saveTask" value={task.description} />
