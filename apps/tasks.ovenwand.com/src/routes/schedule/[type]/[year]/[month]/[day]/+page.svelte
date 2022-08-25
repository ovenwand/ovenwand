<script lang="ts">
  import { isSameDay, addMonths, startOfMonth, subMonths } from '@ovenwand/util.date';
  import { Calendar, Column, Grid, Sheet } from '@ovenwand/ui';
  import { useTasks } from "$lib/store";
  import { getScheduleURL } from "$lib/utils";

  export let data: import('./$types').LoadData;

  const { tasks } = useTasks(data.tasks);

  $: ({ type, day, month, year } = data);
  $: selectedDate = new Date(`${year}-${month}-${day}`);
  $: previousMonth = startOfMonth(subMonths(selectedDate, 1));
  $: nextMonth = startOfMonth(addMonths(selectedDate, 1));
</script>

<Grid relative class="min-h-full">
  <Column>
    <Sheet rounded>
      <Calendar
        display={type}
        date={selectedDate}
        today={getScheduleURL(type, new Date())}
        previous={getScheduleURL(type, previousMonth)}
        next={getScheduleURL(type, nextMonth)}
        let:date
      >
        {#each $tasks as task}
          {#if isSameDay(date, new Date(task.dueDate))}
            <div>{task.title}</div>
          {/if}
        {/each}
      </Calendar>
    </Sheet>
  </Column>
</Grid>
