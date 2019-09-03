import { DateTime } from 'luxon';
import { is, isItShabbat as _isItShabbat, sunset } from 'shabbat-logic';
import lookup from 'tz-lookup';

import { ILocation } from '../../models/config';
import { IHoliday } from '../../models/holidays';
import { AppState } from '../use';

export function getLocation(state: AppState): ILocation | undefined {
	return state.config.location;
}

export function getTimezone(state: AppState): string | undefined {
	const currentLocation = getLocation(state);
	if (!currentLocation) { return; }
	return lookup(currentLocation.coords.latitude, currentLocation.coords.longitude);
}

export function getNow(state: AppState): DateTime | undefined {
	const currentTimezone = getTimezone(state);
	if (!currentTimezone) { return; }
	return DateTime.local().setZone(currentTimezone);
}

export function getShabbatState(state: AppState): { period: is, countDownTo: DateTime } {
	const currentLocation = getLocation(state);
	const rightNow = getNow(state);

	if (!currentLocation || !rightNow) { return; }
	if (!rightNow.isValid) { return; }
	return _isItShabbat(rightNow, currentLocation.coords.latitude, currentLocation.coords.longitude);
}

function accessHolidays(state: AppState): IHoliday[] | undefined {
	return state.holiday.holidays;
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

export function getError(state: AppState): string | undefined {
	return state.error.message;
}
