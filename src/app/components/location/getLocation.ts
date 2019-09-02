import { Location, Permissions } from 'expo';

import { ILocation } from './types';

export default async (): Promise<ILocation> => {
	const { status } = await Permissions.askAsync(Permissions.LOCATION);
	if (status !== 'granted') {
		return {
			// TODO(james.fulford): get location by IP
			coords: {
				latitude: 31.776875,
				longitude: 35.233673,
			},
		};
	}
	const location = Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
	return location;
};
