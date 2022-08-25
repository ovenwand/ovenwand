import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';

export const daysOfTheWeek = Object.freeze(
	eachDayOfInterval({
		start: startOfWeek(Date.now()),
		end: endOfWeek(Date.now())
	}).map((date) => format(date, 'EEEE'))
);

// export const monthsOfTheYear = Object.freeze(
//   eachMonthOfInterval({
//     start: startOfYear(Date.now()),
//     end: endOfYear(Date.now()),
//   })
//   .map(
//     (date) => format(date, 'LLLL')
//   )
// );
