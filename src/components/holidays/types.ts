import { DateTime } from 'luxon';

export enum HolidayCategory {
	ROSHCHODESH = 'roshchodesh',
	HOLIDAY = 'holiday',
	OMER = 'omer',
}

export enum HolidaySubcat {
	MAJOR = 'major',
	MINOR = 'minor',
	SHABBAT = 'shabbat',
	MODERN = 'modern',
}

export interface IHoliday {
	title: string;
	date: DateTime;
	subcat: HolidaySubcat;
	category: HolidayCategory;
}
