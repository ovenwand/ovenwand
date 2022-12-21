import { getYear, getMonth, getDay } from '@ovenwand/util.date';
import { route } from '$lib/route';

export function getScheduleURL(type: 'month', date: Date = new Date()) {
	return route('/schedule/[type]/[year]/[month]/[day]', {
		type,
		year: getYear(date),
		month: getMonth(date),
		day: getDay(date)
	});
}
