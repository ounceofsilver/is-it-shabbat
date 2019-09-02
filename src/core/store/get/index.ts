import { DateTime } from 'luxon';
import { is, isItShabbat as _isItShabbat } from 'shabbat-logic';
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
	return _isItShabbat(rightNow, currentLocation.coords.latitude, currentLocation.coords.longitude);
}

export function getHolidays(state: AppState): IHoliday[] | undefined {
	return state.holiday.holidays;
}
