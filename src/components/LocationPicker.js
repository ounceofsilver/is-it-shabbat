import React from 'react';
import {
	MapView,
} from 'expo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
	action,
} from 'is-it-shabbat-core';

const eventToLocation = e => ({
	coords: {
		latitude: e.nativeEvent.coordinate.latitude,
		longitude: e.nativeEvent.coordinate.longitude,
	},
});

const LocationPicker = ({ location, dispatch }) => {
	const initialRegion = {
		latitude: location.coords.latitude,
		longitude: location.coords.longitude,

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

LocationPicker.propTypes = {
	location: PropTypes.shape({
		coords: PropTypes.shape({
			latitude: PropTypes.number,
			longitude: PropTypes.number,
		}),
	}).isRequired,
	dispatch: PropTypes.func.isRequired,
};

export default connect(
	state => ({
		location: state.location,
	}),
)(LocationPicker);
