<script lang="ts">
	import { getScheduleURL } from '$lib/utils';
	import { useTasks } from '$lib/database';
	import { TaskModal } from '$lib/components';

	export let data: import('./$types').LoadData;

	let task, taskId, year, month, day;
	$: ({ task: taskId, year, month, day } = data);
	$: selectedDate = new Date(`${year}-${month}-${day}`);
	$: tasks = useTasks();
</script>

<TaskModal active back={getScheduleURL(data.type, selectedDate)} task={$task} />
