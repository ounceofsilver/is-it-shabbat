// TypeScript insists that MapView.Marker does not exist
// and that expo.Marker does not work. So, after trying a
// few things, my solution for now is to keep this file as
// a .js file.
import { MapView } from 'expo';
import React from 'react';
import { connect } from 'react-redux';

import { getLocation } from '../../../core/store/use/config/selectors';
import { setLocation as _setLocation } from '../../../core/store/use/config';

const eventToLocation = (e) => ({
	coords: {
		latitude: e.nativeEvent.coordinate.latitude,
		longitude: e.nativeEvent.coordinate.longitude,
	},
});

const LocationPicker = ({ location, setLocation }) => {
	const initialRegion = {
		latitude: location.coords.latitude,
		longitude: location.coords.longitude,

		// For testing:
		// New York
		// latitude: 40.755,
		// longitude: -73.983,

		// Jerusalem
		// latitude: 31.777,
		// longitude: 35.219,

		latitudeDelta: 2,
		longitudeDelta: 1,
	};
	return (
		<MapView
			style={{ flex: 1 }}
			initialRegion={initialRegion}
			onPress={e => setLocation(eventToLocation(e))}
			showsMyLocationButton={false}
			showsPointsOfInterest={false}
			showsCompass={false}
			showsTraffic={false}
			showsIndoors={false}
			toolbarEnabled={false}
		>
			<MapView.Marker coordinate={initialRegion} />
		</MapView>
	);
};

export default connect(
	state => ({
		location: getLocation(state),
	}),
	{
		setLocation: _setLocation,
	}
)(LocationPicker);
