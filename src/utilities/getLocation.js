import {
	Location,
	Permissions,
} from 'expo';

export default async () => {
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
	const location = Location.getCurrentPositionAsync({});
	return location;
};
