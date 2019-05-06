import { DateTime } from 'luxon';

import { IHoliday, IOmerData } from '../../types';
import { categoryFilter, upcomingFilter } from '../../utilities/filters';

export const blessings: string[] = [
	'Chesed',
	'Geruvah',
	'Tiferes',
	'Netzach',
	'Hod',
	'Yesod',
	'Malchus',
];

export function getOmerBlessingInfo({ title }: { title: string }): IOmerData {
	const dayOf = parseInt(title, 10);
	const weekOf = Math.floor((dayOf - 1) / 7);
	const dayOfWeekOf = ((dayOf - 1) % 7) + 1;
	return {
		dayOf,
		dayOfWeekOf,
		weekOf,

		dayBlessing: blessings[dayOfWeekOf - 1],
		weekBlessing: blessings[weekOf],
	};
}

const omerFilter = categoryFilter('omer');

export default function (holidays: IHoliday[], now: DateTime): (IOmerData | IHoliday) | null {
	const todaysOmerList = holidays
		.filter(omerFilter)
		// catch yesterday's omer and current omer, if that has arrived yet
		.filter(upcomingFilter(now.minus({ days: 1, hours: 2 })))
		.filter(h => h.date <= now);

	// console.log(todaysOmerList.map(h => h.date.toString()));
	// console.log(holidays.map(h => h.date.toString()));
	if (todaysOmerList.length > 0) {
		const todayHoliday = todaysOmerList
			.reduce((o1, o2) => (o1.date > o2.date ? o1 : o2)); // take the latest instance
		return {
			...todayHoliday,
			...getOmerBlessingInfo(todayHoliday),
		};
	}

	return null;
}
