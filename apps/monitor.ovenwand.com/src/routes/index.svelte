<script lang="ts">
	import { page } from '$app/stores';
	import { Column, Grid } from '@ovenwand/ui';
	import { useEvents, /* useProjects,*/ type IEvent, type IProject } from '$lib/store';

	import {
		PageViewCounter,
		EventList,
		/* ProjectList, */ PageViewMonthChart,
		PageViewDaysOfTheWeekChart
	} from '$lib/widgets';

	export let data: { projects: IProject[]; events: IEvent[] } = { projects: [], events: [] };

	// const { projects } = useProjects(data.projects);
	const { events, eventsByProject, eventsToday, eventsInPastWeek, eventsInPastMonth, setProject } =
		useEvents(data.events);

	$: setProject($page.url.searchParams.get('project'));
</script>

<Grid>
	<!--	<Column>-->
	<!--		<ProjectList projects={$projects} />-->
	<!--	</Column>-->

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

	<Column columns={{ md: 10 }} offset={{ md: 1 }}>
		<EventList events={$eventsInPastMonth} />
	</Column>
</Grid>
