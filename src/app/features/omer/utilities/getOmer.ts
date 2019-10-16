import { DateTime } from 'luxon';

import { HolidayCategory, IHoliday } from '../../../../core/models/holidays';
import { categoryFilter, upcomingFilter } from '../../holidays/utilities/filters';
import { IOmerData } from '../types';

export const blessings: string[] = [
	'Chesed',
	'Geruvah',
	'Tiferes',
	'Netzach',
	'Hod',
	'Yesod',
	'Malchus',
];

export const blessingExplanations: string[] = [
	'Loving-kindness',
	'Strength/Justice',
	'Beauty',
	'Endurance',
	'Glory/Splendor',
	'Foundation',
	'Kingship/Majesty',
];

export function getOmerBlessingInfo({ title }: { title: string }): IOmerData {
	const dayOf = parseInt(title, 10);
	const weekOf = Math.floor((dayOf) / 7);
	const dayOfWeekOf = ((dayOf) % 7);
	const dayBlessingIndex = ((dayOf - 1) % 7);
	const weekBlessingIndex = Math.floor((dayOf - 1) / 7);
	return {
		dayOf,
		dayOfWeekOf,
		weekOf,

		dayBlessing: blessings[dayBlessingIndex],
		dayBlessingExplanation: blessingExplanations[dayBlessingIndex],
		weekBlessing: blessings[weekBlessingIndex],
		weekBlessingExplanation: blessingExplanations[weekBlessingIndex],
	};
}

const omerFilter = categoryFilter(HolidayCategory.OMER);

export default function (holidays: IHoliday[], now: DateTime): (IOmerData | IHoliday) | null {
	if (!holidays || !now) { return null; }
	const todaysOmerList = holidays
		.filter(omerFilter)
		// catch yesterday's omer and current omer, if that has arrived yet
		.filter(upcomingFilter(now.minus({ days: 1, hours: 2 })))
		.filter(h => h.date <= now);

	if (todaysOmerList.length > 0) {
		const todayHoliday = todaysOmerList.reduce((o1, o2) => (o1.date > o2.date ? o1 : o2));

		return {
			...todayHoliday,
			...getOmerBlessingInfo(todayHoliday),
		};
	}

	return null;
}

export function weeksAndDays(allDays: number, weekDays: number, weeks: number): string {
	let o = `${allDays} day${allDays > 1 ? 's' : ''}`;
	if (weeks === 0) {
		return o;
	}

	o += `, which is ${weeks} week${weeks > 1 ? 's' : ''}`;
	if (weekDays !== 0) {
		o += ` and ${weekDays} day${weekDays > 1 ? 's' : ''}`;
	}

	return o;
}
