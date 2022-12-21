<script lang="ts">
	import { isSameDay, addMonths, startOfMonth, subMonths } from '@ovenwand/util.date';
	import { Calendar, Column, Grid, Sheet } from '@ovenwand/ui';
	import { page } from '$app/stores';
	import { tasks } from '$lib/models';
	import { getScheduleURL } from '$lib/utils';

	export let data: import('./$types').LoadData;

	let type, day, month, year, taskId;
	$: ({ type, day, month, year, task: taskId } = $page.params);
	$: selectedDate = new Date(`${year}-${month}-${day}`);
	$: previousMonth = startOfMonth(subMonths(selectedDate, 1));
	$: nextMonth = startOfMonth(addMonths(selectedDate, 1));
	$: tasks.load(data?.tasks);
</script>

<Grid relative class="min-h-full">
	<Column>
		<Sheet class="h-full" rounded shadow>
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
						<a class="block{taskId === task._id ? ' font-bold' : ''}" href="./{task._id}">
							{task.title}
						</a>
					{/if}
				{/each}
			</Calendar>
		</Sheet>
	</Column>
</Grid>

<slot />
