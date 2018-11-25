import React, { Component } from 'react';
// import {
// 	ScrollView,
// 	View,
// 	Text,
// } from 'react-native';
import {
	MapView,
} from 'expo';

// import ShabbatCheck from '../components/ShabbatCheck';
// import Styles from '../Styles';
import state from '../logic/State';

export default class SettingsScreen extends Component {
	componentDidMount() {
		state.user.subscribe(() => {
			this.setState({});
		});
	}

	render() {
		const s = state.user.getState();
		return (
			<MapView
				style={{ flex: 1 }}
				initialRegion={{
					latitude: s.location.coords.latitude,
					longitude: s.location.coords.longitude,
					latitudeDelta: 0.2,
					longitudeDelta: 0.1,
				}}
				onPress={(e) => {
					state.set.location({
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
