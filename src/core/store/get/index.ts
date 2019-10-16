import { DateTime } from 'luxon';
import { is, isItShabbat, sunset } from 'shabbat-logic';

import { getTime as _getTime } from '../../../app/time';
import { IHoliday } from '../../models/holidays';
import { AppState } from '../use';
import { getLocation, getTimezone } from '../use/config/selectors';
import { accessHolidays } from '../use/holiday/selectors';

//
// Complex/composite selectors go here.
//
export function getNow(state: AppState, getTime = _getTime): DateTime | undefined {
	const currentTimezone = getTimezone(state);
	if (!currentTimezone) { return; }
	return getTime().setZone(currentTimezone);
}

export function getShabbatState(
	state: AppState,
	getTime = _getTime,
): { period: is, countDownTo: DateTime } | undefined {
	const currentLocation = getLocation(state);
	const rightNow = getNow(state, getTime);

	if (!currentLocation || !rightNow) { return; }
	if (!rightNow.isValid) { return; }
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
