<script lang="ts">
  import { getScheduleURL } from "$lib/utils";
  import { useTasks } from "$lib/store";
  import { TaskModal } from '$lib/components';

  export let data: import('./$types').LoadData;

  let task, taskId, year, month, day, getTask;

  $: ({ task: taskId, year, month, day } = data);
  $: selectedDate = new Date(`${year}-${month}-${day}`);
  $: ({ get: getTask } = useTasks());
  $: ({ task } = getTask(taskId, { shouldFetch: false, fetch }));
</script>

<TaskModal
  active
  back={getScheduleURL(data.type, selectedDate)}
  task={$task}
/>
