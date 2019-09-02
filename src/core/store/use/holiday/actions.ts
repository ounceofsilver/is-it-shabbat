import { DateTime } from 'luxon';

import { getHolidaysAsync } from '../../../api/hebcal';
import { IHoliday, IHolidayOptions } from '../../../models/holidays';
import { getTime, mapOptions } from './utilities';

export enum HolidayType {
	SET = 'Holiday.SET',
	SET_OPTIONS = 'Holiday.SET_OPTIONS',
}

// TODO(james): No export
interface ISetHolidayAction {
	type: typeof HolidayType.SET;
	holidays: IHoliday[];
	lastRequest: number;
}

function setHolidays(holidays: IHoliday[], _time: () => number = getTime): ISetHolidayAction {
	return {
		holidays,
		lastRequest: _time(),
		type: HolidayType.SET,
	};
}

export function getHolidays(now: DateTime, months: number, options: IHolidayOptions) {
	return (dispatch: any) => {

		getHolidaysAsync(
			now, months, mapOptions(options),
		)
			.then((holidays: IHoliday[]) => dispatch(
				setHolidays(holidays),
			));

	};
}

// TODO(james): No export
interface ISetHolidayOptionsAction {
	type: typeof HolidayType.SET_OPTIONS;
	options: IHolidayOptions;
}

export function setHolidayOptions(
	options: IHolidayOptions,
): ISetHolidayOptionsAction {
	return {
		options,
		type: HolidayType.SET_OPTIONS,
	};
}

// Aggregate
export type HolidayAction = ISetHolidayAction | ISetHolidayOptionsAction;
