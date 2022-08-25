import {
	getDaysInMonth,
	setDate,
	setHours,
	setMinutes,
	setSeconds,
	setMilliseconds
} from 'date-fns';

export function setToFirstOfMonth(date: Date | number) {
	// TODO Don't cry we'll fix this later
	return setDate(setHours(setMinutes(setSeconds(setMilliseconds(date, 0), 0), 0), 0), 0);
}

export function setToLastOfMonth(date: Date | number) {
	// TODO Don't cry we'll fix this later
	return setDate(
		setHours(setMinutes(setSeconds(setMilliseconds(date, 999), 59), 59), 23),
		getDaysInMonth(date)
	);
}
