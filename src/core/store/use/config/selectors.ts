import lookup from 'tz-lookup';

import { AppState } from '..';
import { ILocation } from '../../../models/config';

export function getLocation(state: AppState): ILocation | undefined {
	return state.config.location;
}

export function getTimezone(state: AppState): string | undefined {
	const currentLocation = getLocation(state);
	if (!currentLocation) { return; }
	return lookup(currentLocation.coords.latitude, currentLocation.coords.longitude);
}
