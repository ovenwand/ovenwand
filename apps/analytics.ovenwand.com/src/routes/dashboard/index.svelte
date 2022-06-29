<script lang="ts">
	import { page } from '$app/stores';
	import { Column, Grid } from '@ovenwand/ui';
	import { useEvents, useProjects, type IEvent, type IProject } from '$lib/store';

	import PageViewCounter from './_/PageViewCounter.svelte';
	import EventList from './_/EventList.svelte';
	import ProjectList from './_/ProjectList.svelte';
	import PageViewMonthChart from './_/PageViewMonthChart.svelte';
	import PageViewDaysOfTheWeekChart from './_/PageViewDaysOfTheWeekChart.svelte';

	export let data: { projects: IProject[]; events: IEvent[] } = { projects: [], events: [] };

	const { projects } = useProjects(data.projects);
	const { events, eventsByProject, eventsToday, eventsInPastWeek, eventsInPastMonth, setProject } =
		useEvents(data.events);

	$: setProject($page.url.searchParams.get('project'));
</script>

<Grid>
	<Column>
		<ProjectList projects={$projects} />
	</Column>

	<Column columns={{ md: 4 }}>
		<PageViewCounter
			events={$events}
			eventsToday={$eventsToday}
			eventsInPastWeek={$eventsInPastWeek}
			eventsInPastMonth={$eventsInPastMonth}
		/>
	</Column>

	<Column columns={{ md: 4 }}>
		<PageViewMonthChart events={$eventsInPastMonth} />
	</Column>

	<Column columns={{ md: 4 }}>
		<PageViewDaysOfTheWeekChart events={$eventsByProject} />
	</Column>

	<Column>
		<EventList events={$eventsInPastMonth} />
	</Column>
</Grid>
