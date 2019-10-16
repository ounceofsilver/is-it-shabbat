import { DateTime } from 'luxon';

import { HolidayCategory, IHoliday } from '../../../../core/models/holidays';
import { categoryFilter, topNFilter, upcomingFilter } from './filters';
import { ascending } from './sorters';

const top3Filter = topNFilter(3);

function upcomingTop3OfCategory(
	category: HolidayCategory,
): (holidays: IHoliday[], now: DateTime) => IHoliday[] {
	return (holidays, now) => holidays
		.filter(upcomingFilter(now))
		.filter(categoryFilter(category))
		.slice()
		.sort(ascending)
		.filter(top3Filter);
}

export const getRoshChodeshim = upcomingTop3OfCategory(HolidayCategory.ROSHCHODESH);
export const getMajorHolidays = upcomingTop3OfCategory(
	HolidayCategory.HOLIDAY, // HolidaySubcat.MAJOR,
);
export const getMinorHolidays = upcomingTop3OfCategory(
	HolidayCategory.HOLIDAY, // HolidaySubcat.MINOR,
);
export const getSpecialShabbats = upcomingTop3OfCategory(
	HolidayCategory.HOLIDAY, // HolidaySubcat.SHABBAT,
);
export const getModernHolidays = upcomingTop3OfCategory(
	HolidayCategory.HOLIDAY, // HolidaySubcat.MODERN,
);
export const getDaysOfOmer = upcomingTop3OfCategory(HolidayCategory.OMER);

export const internal = {
	top3Filter,
	upcomingTop3OfCategory,
};
