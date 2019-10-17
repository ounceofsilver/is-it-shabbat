import { ILocation } from './types';

export enum ConfigType {
	SET_LOCATION = 'Config.SET_LOCATION',
}

// TODO(james): No export
export interface ISetLocationAction {
	type: typeof ConfigType.SET_LOCATION;
	location: ILocation;
}

export function setLocation(location: ILocation): ISetLocationAction {
	return {
		location,
		type: ConfigType.SET_LOCATION,
	};
}

export type ConfigAction = ISetLocationAction;
