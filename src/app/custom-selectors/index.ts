import { DateTime } from 'luxon';
import { is, isItShabbat, sunset } from 'shabbat-logic';

import { AppState } from '../../core/store';
import { getLocation } from '../../core/store/config';
import { accessHolidays, IHoliday } from '../../core/store/holiday';
import { getTime as _getTime } from '../time';

//
// Complex/composite selectors go here.
//

export function getShabbatState(
	state: AppState,
	getTime = _getTime,
): { period: is, countDownTo: DateTime } | undefined {
	const currentLocation = getLocation(state);
	if (!currentLocation) { return; }	
	const rightNow = getTime();
	return isItShabbat(
		rightNow,
		currentLocation.coords.latitude,
		currentLocation.coords.longitude,
	);
}

export function getHolidays(state: AppState): IHoliday[] | undefined {
	const currentLocation = getLocation(state);
	const holidays = accessHolidays(state);
	if (!currentLocation || !holidays) { return; }
	return holidays
		.map(h => ({
			...h,
			date: sunset(h.date, currentLocation.coords.latitude, currentLocation.coords.longitude),
		}));
}
