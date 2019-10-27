import * as _lookup from 'tz-lookup';

import { AppState } from '..';
import { ILocation } from './types';

// In prod build, this _lookup is a function.
// In tests and web version, _lookup.lookup is the function.
// TypeScript has its moments. This is not one of the good ones.
const lookup: (lat: number, long: number) => ReturnType<_lookup> = _lookup.default || _lookup;

export function getLocation(state: AppState): ILocation | undefined {
	return state.config.location;
}

export function getTimezone(state: AppState): string | undefined {
	const currentLocation = getLocation(state);
	if (!currentLocation) { return; }
	return lookup(currentLocation.coords.latitude, currentLocation.coords.longitude);
}
