import { format } from '@ovenwand/util.date';

export function getScheduleURL(type: 'month', date: Date = new Date()) {
	return `/schedule/${type}/${format(date, 'yyyy/MM/dd')}`;
}
