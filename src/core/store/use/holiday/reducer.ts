import { IHoliday, IHolidayOptions } from '../../../models/holidays';
import { HolidayAction, HolidayType } from './actions';

// State
export interface IHolidayState {
	holidays?: IHoliday[];
	options: IHolidayOptions;
	lastRequest?: number;
}
const initialState: IHolidayState = {
	options: {
		major: true,
		minor: false,
		modern: false,
		roshChodeshim: true,
		specialShabbatim: false,
		fasts: false,
		hillel: true,
	},
};

// Reducer
export default (
	state: IHolidayState = initialState,
	action: HolidayAction,
): IHolidayState => {
	switch (action.type) {
	case HolidayType.SET:
		return {
			...state,
			holidays: action.holidays,
			lastRequest: action.lastRequest,
		};
	case HolidayType.SET_OPTIONS:
		return {
			...state,
			options: action.options,
		};
	default:
		return state;
	}
};
