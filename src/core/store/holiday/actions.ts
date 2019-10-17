import { DateTime } from 'luxon';

import { setError } from '../error';
import { getHolidaysAsync } from './api';
import { IHoliday, IHolidayOptions, RequestState } from './types';
import { mapOptions } from './utilities';

export enum HolidayType {
	SET = 'Holiday.SET',
	SET_OPTIONS = 'Holiday.SET_OPTIONS',
	SET_REQUEST_STATE = 'Holiday.SET_REQUEST_STATE',
}

interface ISetHolidayAction {
	type: typeof HolidayType.SET;
	holidays: IHoliday[];
}

function setHolidays(holidays: IHoliday[]): ISetHolidayAction {
	return {
		holidays,
		type: HolidayType.SET,
	};
}

interface ISetHolidayRequestState {
	type: typeof HolidayType.SET_REQUEST_STATE;
	requestState: RequestState;
}
function setHolidayState(requestState: RequestState): ISetHolidayRequestState {
	return {
		requestState,
		type: HolidayType.SET_REQUEST_STATE,
	};
}

export function getHolidays(now: DateTime, months: number, options: IHolidayOptions) {
	return (dispatch: any) => {

		dispatch(setHolidayState(RequestState.WAITING));
		getHolidaysAsync(now, months, mapOptions(options))
			.then((holidays: IHoliday[]) => {
				dispatch(setHolidays(holidays));
			})
			.catch((err) => {
				dispatch(setHolidayState(RequestState.FAILURE));
				dispatch(setError(err.toString(), false));
			});

	};
}

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
export type HolidayAction = ISetHolidayAction
	| ISetHolidayOptionsAction
	| ISetHolidayRequestState;
