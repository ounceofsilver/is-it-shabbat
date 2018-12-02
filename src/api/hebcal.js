const axios = require('axios');
const { DateTime } = require('luxon');

const baseParams = {
	v: 1,
	cfg: 'json',

	// Candlelighting
	c: 'off',

	// hebdate: includes items with .memo giving hebrew date,
	// i.e. '1st of Kislev, 5779'. hebdate items are separate from holidays
	D: 'on', // hebdate for every holiday
	d: 'off', // hebdate for every hebrew day in the month
};


const defaultConfig = {
	// Holidays
	maj: 'on',
	min: 'off',
	mod: 'off',
	nx: 'on',
	ss: 'off',
	s: 'off',
	mf: 'off',
	o: 'off',

	// language
	lg: 'a',

	// Depends on location (Israel)
	i: 'off',
};

const sendHolidayRequestAsync = (t, overrides) => axios({
	method: 'get',
	url: 'https://www.hebcal.com/hebcal/',
	params: {
		...defaultConfig,
		...overrides,
		// Depends on current time
		year: t.year,
		month: t.month,
		...baseParams,
	},
});

const getHolidaysAsync = async (now, months = 2, overrides = {}) => {
	if (months <= 0) {
		return [];
	}
	const monthArr = Array(months).fill().map((_, i) => i)
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
			hebdates[i.date] = i.title;
		});

	// preparing holidays list
	const holidays = days
		.filter(i => i.category !== 'hebdate');

	return holidays.map((h) => {
		const [year, month, day] = h.date.split('-').map(Number);
		return ({
			...h,
			hebdate: hebdates[h.date],
			date: DateTime.fromObject({
				year,
				month,
				day,
				hour: 0,
				minute: 0,
				second: 0,
				zone: now.zone,
			}),
		});
	});
};

// getHolidaysAsync(DateTime.local(), 2).then(console.log);

module.exports = {
	getHolidaysAsync,
};
