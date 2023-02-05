import MapView, { Marker } from 'react-native-maps';

import React from 'react';
import { connect } from 'react-redux';

import { getLocation, setLocation as _setLocation } from '../../../core/store/config';
import { AppState } from '../../../core/store';

const eventToLocation = e => ({
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
			region={initialRegion}
			onPress={e => setLocation(eventToLocation(e))}
			showsMyLocationButton={true}
			showsPointsOfInterest={false}
			showsCompass={false}
			showsTraffic={false}
			showsIndoors={false}
			toolbarEnabled={true}
		>
			<Marker coordinate={initialRegion} />
		</MapView>
	);
};

export default connect(
	(state: AppState) => ({
		location: getLocation(state),
	}),
	{
		setLocation: _setLocation,
	},
)(LocationPicker);
