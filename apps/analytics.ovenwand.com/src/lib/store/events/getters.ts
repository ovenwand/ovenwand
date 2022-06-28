import { derived } from 'svelte/store';
import { events, projectId } from './state';
import { isAfter, isToday, subMonths, subWeeks } from '@ovenwand/util.date';

export const eventsByProject = derived([events, projectId], ([$events, $projectId]) =>
	$projectId ? $events.filter((event) => event.project._id === $projectId) : $events
);

export const eventsToday = derived(eventsByProject, ($events) =>
	$events.filter((event) => isToday(new Date(event.timestamp)))
);

export const eventsInPastWeek = derived(eventsByProject, ($events) =>
	$events.filter((event) => isAfter(new Date(event.timestamp), subWeeks(new Date(), 1)))
);

export const eventsInPastMonth = derived(eventsByProject, ($events) =>
	$events.filter((event) => isAfter(new Date(event.timestamp), subMonths(new Date(), 1)))
);
