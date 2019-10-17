import { Location, Permissions } from 'expo';

import { ILocation } from '../../../core/store/config';
import { setError } from '../../../core/store/error';
import store from '../../store';

const defaultLocation: ILocation = {
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
			store.dispatch(setError('location.denied'));
			return Promise.resolve(defaultLocation);
		}
		const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
		return Promise.resolve(location);
	} catch (e) {
		store.dispatch(setError('location.unavailable'));
		return Promise.resolve(defaultLocation);
	}
};
