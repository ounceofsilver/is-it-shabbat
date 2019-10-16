import { IHoliday } from '../../../../core/models/holidays';

export const ascending = (h1: IHoliday, h2: IHoliday): number =>
	h1.date.diff(h2.date).shiftTo('milliseconds').milliseconds;

export const descending = (h1: IHoliday, h2: IHoliday): number =>
	h2.date.diff(h1.date).shiftTo('milliseconds').milliseconds;
