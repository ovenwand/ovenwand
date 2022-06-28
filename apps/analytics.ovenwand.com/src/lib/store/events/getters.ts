import { derived } from 'svelte/store';
import { events } from './state';
import { isAfter, isToday, subMonths, subWeeks } from '@ovenwand/util.date';

export const eventsToday = derived(events, ($events) =>
	$events.filter((event) => isToday(new Date(event.timestamp)))
);

export const eventsInPastWeek = derived(events, ($events) =>
	$events.filter((event) => isAfter(new Date(event.timestamp), subWeeks(new Date(), 1)))
);

export const eventsInPastMonth = derived(events, ($events) =>
	$events.filter((event) => isAfter(new Date(event.timestamp), subMonths(new Date(), 1)))
);
