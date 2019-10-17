import { AppState } from '../..';
import { IHoliday } from '../../../models/holidays';

export function accessHolidays(state: AppState): IHoliday[] | undefined {
	return state.holiday.holidays;
}
