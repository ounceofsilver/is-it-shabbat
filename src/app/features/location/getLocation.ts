import * as Location from 'expo-location';

import { ILocation } from '../../../core/store/config';
import { setError } from '../../../core/store/error';
import store from '../../container/store';

const defaultLocation: ILocation = {
	coords: {
		latitude: 31.776875,
		longitude: 35.233673,
	},
};

export default async (): Promise<ILocation> => {
	try {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			store.dispatch(setError('location.denied'));
			return Promise.resolve(defaultLocation);
		}
		const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
		return Promise.resolve({
			coords: {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			},
		});
	} catch (e) {
		store.dispatch(setError('location.unavailable'));
		return Promise.resolve(defaultLocation);
	}
};
