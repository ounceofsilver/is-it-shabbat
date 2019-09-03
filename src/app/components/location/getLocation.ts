import { Location, Permissions } from 'expo';

import { ILocation } from '../../../core/models/config';

const defaultLocation = {
	// TODO(james.fulford): get location by IP
	coords: {
		latitude: 31.776875,
		longitude: 35.233673,
	},
};

export default async (): Promise<ILocation> => {
	try {
		const { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			return Promise.resolve(defaultLocation);
		}
		const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
		return Promise.resolve(location);
	} catch (e) {
		// console.error(e);
		return Promise.resolve(defaultLocation);
	}
};
