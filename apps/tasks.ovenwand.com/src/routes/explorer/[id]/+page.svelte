<script lang="ts">
	import { Panel } from '$lib/components';

	export let data: import('./$types').PageLoadData;

	$: task = data.task;
</script>


<Panel title={task.title}>
		 <p>{task.description}</p>
</Panel>
