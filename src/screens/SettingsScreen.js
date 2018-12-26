import React, { Component } from 'react';
import {
	MapView,
} from 'expo';

import {
	action,
	state,
} from 'is-it-shabbat-core';

export default class SettingsScreen extends Component {
	componentDidMount() {
		state.subscribe(() => {
			this.setState({});
		});
	}

	render() {
		const s = state.getState();
		return (
			<MapView
				style={{ flex: 1 }}
				initialRegion={{
					latitude: s.location.coords.latitude,
					longitude: s.location.coords.longitude,
					latitudeDelta: 2,
					longitudeDelta: 1,
				}}
				onPress={e => action.setLocation({
					coords: {
						latitude: e.nativeEvent.coordinate.latitude,
						longitude: e.nativeEvent.coordinate.longitude,
					},
				})}
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
