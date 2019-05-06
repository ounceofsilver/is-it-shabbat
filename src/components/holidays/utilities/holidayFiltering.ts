import { DateTime } from 'luxon';

import { IHoliday } from '../types';
import { categoryFilter, topNFilter, upcomingFilter } from './filters';
import { ascending } from './sorters';

const top3Filter = topNFilter(3);

function upcomingTop3OfCategory(
	category: string, subcat?: string,
): (holidays: IHoliday[], now: DateTime) => IHoliday[] {
	return (holidays, now) => holidays
		.filter(upcomingFilter(now))
		.filter(categoryFilter(category, subcat))
		.sort(ascending)
		.filter(top3Filter);
}

export const getRoshChodeshim = upcomingTop3OfCategory('roshchodesh');
export const getMajorHolidays = upcomingTop3OfCategory('holiday', 'major');
export const getMinorHolidays = upcomingTop3OfCategory('holiday', 'minor');
export const getSpecialShabbats = upcomingTop3OfCategory('holiday', 'shabbat');
export const getModernHolidays = upcomingTop3OfCategory('holiday', 'modern');
export const getDaysOfOmer = upcomingTop3OfCategory('omer');

export const internal = {
	top3Filter,
	upcomingTop3OfCategory,
};
