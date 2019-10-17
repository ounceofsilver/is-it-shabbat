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
	yomtov: boolean;
}

export interface IHolidayOptions {
	major: boolean;
	minor: boolean;
	modern: boolean;
	roshChodeshim: boolean;
	specialShabbatim: boolean;
	fasts: boolean;
	hillel: boolean;
}
