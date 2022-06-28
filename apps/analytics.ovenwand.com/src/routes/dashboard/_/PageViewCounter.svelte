<script lang="ts">
	import type { IEvent } from '$lib/store';

	export let events: IEvent[];
	export let eventsToday: IEvent[];
	export let eventsInPastWeek: IEvent[];
	export let eventsInPastMonth: IEvent[];

	$: todayCount = eventsToday.reduce(toPageViewCount, 0);
	$: pastWeekCount = eventsInPastWeek.reduce(toPageViewCount, 0);
	$: pastMonthCount = eventsInPastMonth.reduce(toPageViewCount, 0);
	$: allTimeCount = events.reduce(toPageViewCount, 0);

	function toPageViewCount(count, event) {
		return event.type === 'page_view' ? ++count : count;
	}
</script>

<div>Page views (today): {todayCount}</div>
<div>Page views (this week): {pastWeekCount}</div>
<div>Page views (this month): {pastMonthCount}</div>
<div>Page views (all time): {allTimeCount}</div>
