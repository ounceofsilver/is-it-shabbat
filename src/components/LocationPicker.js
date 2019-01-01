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

function LocationPicker({ location, dispatch }) {
	return (
		<MapView
			style={{ flex: 1 }}
			initialRegion={{
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: 2,
				longitudeDelta: 1,
			}}
			onPress={e => dispatch(action.setLocation(eventToLocation(e)))}
			showsMyLocationButton={false}
			showsPointsOfInterest={false}
			showsCompass={false}
			showsTraffic={false}
			showsIndoors={false}
			toolbarEnabled={false}
		>
			<MapView.Marker coordinate={location.coords} />
		</MapView>
	);
}
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
