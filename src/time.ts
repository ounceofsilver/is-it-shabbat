import { utilities } from 'is-it-shabbat-core';

const { DateTime } = utilities;

export const getTime = () => {
	return DateTime.local();
	//
	//
	// Simulate different times
	//
	//

	// Done at (43, -71)
	//
	// 2 weeks before Rosh Hashana
	//

	// Weekday
	// tslint:disable-next-line: max-line-length
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 22, hour: 7, minute: 0, second: 0 });

	// Friday, pre-candlelighting
	// tslint:disable-next-line: max-line-length
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 24, hour: 14, minute: 0, second: 0 });

	// Candlelighting Crossover
	// tslint:disable-next-line: max-line-length
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 24, hour: 19, minute: 18, second: 10 });

	// Candlelighting
	// tslint:disable-next-line: max-line-length
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 24, hour: 19, minute: 22, second: 30 });

	// Shabbat crossover
	// tslint:disable-next-line: max-line-length
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 24, hour: 19, minute: 36, second: 10 });

	// Friday Shabbat
	// tslint:disable-next-line: max-line-length
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 24, hour: 21, minute: 0, second: 0 });

	// Friday Saturday crossover
	// tslint:disable-next-line: max-line-length
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 24, hour: 23, minute: 59, second: 55 });

	// Saturday Shabbat
	// tslint:disable-next-line: max-line-length
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 25, hour: 14, minute: 0, second: 0 });

	// Havdala
	// tslint:disable-next-line: max-line-length
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 25, hour: 20, minute: 16, second: 32 });

	// Saturday Not Shabbat
	// tslint:disable-next-line: max-line-length
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 25, hour: 21, minute: 0, second: 0 });

	//
	// Hannukah
	//

	// Holiday crossover
	// tslint:disable-next-line: max-line-length
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 12, day: 2, hour: 16, minute: 11, second: 44 });
};
