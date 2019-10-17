import { AppState } from '..';
import { IHoliday, IHolidayOptions, RequestState } from './types';

export function accessHolidays(state: AppState): IHoliday[] {
	return state.holiday.holidays || [];
}

export function getHolidayRequestState(state: AppState): RequestState {
	return state.holiday.requestState;
}

export function getHolidayOptions(state: AppState): IHolidayOptions {
	return state.holiday.options;
}
