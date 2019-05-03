export const blessings = [
	'Chesed',
	'Geruvah',
	'Tiferes',
	'Netzach',
	'Hod',
	'Yesod',
	'Malchus',
];

export function getOmerBlessingInfo(holiday) {
	const dayOf = parseInt(holiday.title, 10);
	const weekOf = Math.floor((dayOf - 1) / 7) + 1;
	const dayOfWeekOf = ((dayOf - 1) % 7) + 1;
	return {
		dayOf,
		dayBlessing: blessings[dayOfWeekOf - 1],
		weekBlessing: blessings[weekOf - 1],

		weekOf,
		dayOfWeekOf,
	};
}

export default function (holidays, now) {
	const todaysOmerList = holidays
		.filter(h => h.category === 'omer')
		.filter(h => h.date >= now.startOf('day') && h.date <= now.endOf('day'));

	if (todaysOmerList.length > 0) {
		const todayHoliday = todaysOmerList[0];
		return {
			...todayHoliday,
			...getOmerBlessingInfo(todayHoliday),
		};
	}

	return undefined;
}
