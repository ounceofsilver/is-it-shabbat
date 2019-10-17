import { DateTime } from 'luxon';

import { HolidayCategory, HolidaySubcat, IHoliday } from '../../../../core/store/holiday';

export function upcomingFilter(now: DateTime): (h: IHoliday) => boolean {
	return (h: IHoliday) => h.date >= now;
}

export function categoryFilter(
	category: HolidayCategory, subcat?: HolidaySubcat,
): (h: IHoliday) => boolean {
	return (h: IHoliday) => h.category === category
		&& (subcat ? subcat === h.subcat : true); // if subcat not provided, don't restrict
}

export function topNFilter(n: number): (_: any, i: number) => boolean {
	return (_, i: number) => i < n;
}
