import { AppState } from '..';
import { ILocation } from './types';

export function getLocation(state: AppState): ILocation | undefined {
	return state.config.location;
}
