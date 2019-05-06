import { DateTime } from 'luxon';

export interface IHoliday {
	title: string;
	date: DateTime;
	subcat: string;
	category: string;
}

export interface IOmerData {
	dayBlessing: string;
	weekBlessing: string;
	dayOf: number;
	weekOf: number;
	dayOfWeekOf: number;
}
