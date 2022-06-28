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
	const { eventsInPastMonth } = useEvents(data.events);

	$: projectId = $page.url.searchParams.get('project');

	$: eventsByProject = projectId
		? $eventsInPastMonth.filter(({ project }) => project._id === projectId)
		: $eventsInPastMonth;
</script>

<Grid>
	<Column>
		<ProjectList projects={$projects} />
	</Column>

	<Column columns={{ md: 4 }}>
		<PageViewCounter events={eventsByProject} />
	</Column>

	<Column columns={{ md: 4 }}>
		<PageViewMonthChart events={eventsByProject} />
	</Column>

	<Column columns={{ md: 4 }}>
		<PageViewDaysOfTheWeekChart events={eventsByProject} />
	</Column>

	<Column>
		<EventList events={eventsByProject} />
	</Column>
</Grid>
