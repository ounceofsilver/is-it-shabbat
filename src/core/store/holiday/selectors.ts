import { AppState } from '..';
import { IHoliday } from './types';

export function accessHolidays(state: AppState): IHoliday[] | undefined {
	return state.holiday.holidays;
}
