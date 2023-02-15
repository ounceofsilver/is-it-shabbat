import axios from 'axios';
import { DateTime, Duration } from 'luxon';
import { IHoliday } from './types';

const baseParams = {
	v: 1,
	cfg: 'json',

	// Candlelighting
	c: 'off',

	D: 'off',
	// hebdate for every hebrew day in the month
	d: 'off',

	s: 'off', // parashat data
	o: 'off', // days of omer

	// TODO: localize holidays using this API option: https://www.hebcal.com/home/195/jewish-calendar-rest-api
	lg: 's', // sephardic pronounciations

	leyning: 'off',
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

const sendHolidayRequestAsync = (start: DateTime, end: DateTime, overrides = {}) => axios({
	method: 'get',
	url: 'https://www.hebcal.com/hebcal/',
	params: {
		...overrides,
		start: start.toISODate(),
		end: end.toISODate(),
		...baseParams,
	},
});

export const getHolidaysAsync = async (
	now: DateTime,
	months: number,
	overrides = {},
): Promise<IHoliday[]> => {
	const start = now;
	const end = start.plus(Duration.fromObject({ months }));

	const response = await sendHolidayRequestAsync(start, end, overrides);
	const holidays = response.data.items;

	return holidays.map((h) => {
		const [year, month, day] = h.date.split('-').map(Number);
		return ({
			...h,
			date: DateTime.fromObject({
				year,
				month,
				day,
				hour: 0,
				minute: 0,
				second: 0,
			}).minus({ days: 1 }),
			// hebcal gregorian dates correspond
			// to the END of the hebrew day (I checked it to be true for Rosh Chodesh and Major holidays)
			// this code wants the BEGINNING of the hebrew day.
		});
	});
};

export const internal = {
	sendHolidayRequestAsync,
};
