import { DateTime } from 'luxon';

import { IHoliday } from '../types';

export function upcomingFilter(now: DateTime): (h: IHoliday) => boolean {
	return (h: IHoliday) => h.date >= now;
}

export function categoryFilter(category: string, subcat?: string): (h: IHoliday) => boolean {
	return (h: IHoliday) => h.category === category
		&& (subcat ? subcat === h.subcat : true); // if subcat not provided, don't restrict
}

export function topNFilter(n: number): (_: any, i: number) => boolean {
	return (_, i: number) => i < n;
}
