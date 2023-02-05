import axios from 'axios';
import { DateTime } from 'luxon';
import { IHoliday } from './types';

const baseParams = {
	v: 1,
	cfg: 'json',

	// Candlelighting
	c: 'off',

	// hebdate: includes items with .memo giving hebrew date,
	// i.e. '1st of Kislev, 5779'. hebdate items are separate from holidays
	// hebdate for every holiday
	D: 'on',
	// hebdate for every hebrew day in the month
	d: 'off',

	s: 'off', // parashat data
	o: 'on', // days of omer
	lg: 'a', // ashkenazi pronouncement
};

type OnOff = 'on' | 'off';

export interface IHebcalOptions {
	// Holidays
	maj: OnOff; // major holidays
	min: OnOff; // minor holidays
	mod: OnOff; // modern holidays
	nx: OnOff; // rosh chodesh
	ss: OnOff; // special shabbats
	mf: OnOff; // minor fasts
	i: OnOff; // in israel (double-holidays)
}

const sendHolidayRequestAsync = (t, overrides = {}) => axios({
	method: 'get',
	url: 'https://www.hebcal.com/hebcal/',
	params: {
		...overrides,
		// Depends on current time
		year: t.year,
		month: t.month,
		...baseParams,
	},
});

export const getHolidaysAsync = async (
	now: DateTime,
	months: number,
	overrides = {},
): Promise<IHoliday[]> => {

	if (months <= 0) {
		return [];
	}

	const monthArr = Array(months).fill(0).map((_, i) => i)
		.map(m => now.plus({ months: m }));

	const days = await Promise.all(
		monthArr
			.map(t => sendHolidayRequestAsync(t, overrides)),
	).then(resps => resps
		.map(response => response.data.items)
		.reduce((a, x) => a.concat(x)));

	// date to hebrew date string mapping
	const hebdates = new Map();
	days
		.filter(i => i.category === 'hebdate')
		.forEach((i) => {
			hebdates.set(i.date, i.title);
		});

	// preparing holidays list
	const holidays = days
		.filter(i => i.category !== 'hebdate');

	return holidays.map((h) => {
		const [year, month, day] = h.date.split('-').map(Number);
		return ({
			...h,
			yomtov: Boolean(h.yomtov),
			hebdate: hebdates.get(h.date),
			date: DateTime.fromObject({
				year,
				month,
				day,
				hour: 0,
				minute: 0,
				second: 0,
			}).minus({ days: 1 }),
			// hebcal gregorian dates correspond
			// to the END of the hebrew day.
			// this code wants the BEGINNING of the hebrew day.
		});
	});
};

export const internal = {
	sendHolidayRequestAsync,
};
