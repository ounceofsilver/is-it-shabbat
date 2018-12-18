import React, { Component } from 'react';
import {
	MapView,
} from 'expo';

import { state } from 'is-it-shabbat-core';

const { spacetime } = state;

export default class SettingsScreen extends Component {
	componentDidMount() {
		spacetime.user.subscribe(() => {
			this.setState({});
		});
	}

	render() {
		const s = spacetime.user.getState();
		return (
			<MapView
				style={{ flex: 1 }}
				initialRegion={{
					latitude: s.location.coords.latitude,
					longitude: s.location.coords.longitude,
					latitudeDelta: 2,
					longitudeDelta: 1,
				}}
				onPress={(e) => {
					spacetime.action.setLocation({
						coords: {
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude,
						},
					});
					this.setState({}); // Re-renders Marker
				}}
				showsMyLocationButton={false}
				showsPointsOfInterest={false}
				showsCompass={false}
				showsTraffic={false}
				showsIndoors={false}
				toolbarEnabled={false}
			>
				<MapView.Marker coordinate={s.location.coords} />
			</MapView>
		);
	}
}
