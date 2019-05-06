import { MapView } from 'expo';
import { action } from 'is-it-shabbat-core';
import React from 'react';
import { connect } from 'react-redux';

const eventToLocation = (e) => ({
	coords: {
		latitude: e.nativeEvent.coordinate.latitude,
		longitude: e.nativeEvent.coordinate.longitude,
	},
});

const LocationPicker = ({ location, dispatch }) => {
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
			onPress={e => dispatch(action.setLocation(eventToLocation(e)))}
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
		location: state.location,
	}),
)(LocationPicker);
