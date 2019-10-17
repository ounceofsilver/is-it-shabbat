import { HolidayAction, HolidayType } from './actions';
import { IHoliday, IHolidayOptions, RequestState } from './types';

// State
export interface IHolidayState {
	holidays?: IHoliday[];
	options: IHolidayOptions;
	requestState: RequestState;
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
	requestState: RequestState.NOSTART,
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
			requestState: RequestState.SUCCESS,
		};
	case HolidayType.SET_OPTIONS:
		return {
			...state,
			options: action.options,
		};
	case HolidayType.SET_REQUEST_STATE:
		return {
			...state,
			requestState: action.requestState,
		};
	default:
		return state;
	}
};
