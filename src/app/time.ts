import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

export const useTime = (refreshCycle: number = 100) => {
	const [now, setNow] = useState(getTime());
	useEffect(() => {
		const intervalId = setInterval(
			() => setNow(getTime()),
			refreshCycle,
		);
		return () => clearInterval(intervalId);
	},        [refreshCycle, setInterval, clearInterval, setNow, getTime]);
	return now;
};

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
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 22, hour: 7, minute: 0, second: 0 });

	// Friday, pre-candlelighting
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 24, hour: 14, minute: 0, second: 0 });

	// Candlelighting Crossover
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 24, hour: 19, minute: 18, second: 10 });

	// Candlelighting
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 24, hour: 19, minute: 22, second: 30 });

	// Shabbat crossover
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 24, hour: 19, minute: 36, second: 10 });

	// Friday Shabbat
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 24, hour: 21, minute: 0, second: 0 });

	// Friday Saturday crossover
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 24, hour: 23, minute: 59, second: 55 });

	// Saturday Shabbat
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 25, hour: 14, minute: 0, second: 0 });

	// Havdala
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 25, hour: 20, minute: 16, second: 32 });

	// Saturday Not Shabbat
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 25, hour: 21, minute: 0, second: 0 });

	//
	// Hannukah
	//

	// Holiday crossover
	// return DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 12, day: 2, hour: 16, minute: 11, second: 44 });
};
