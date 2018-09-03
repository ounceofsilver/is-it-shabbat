import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text
} from 'react-native';
import {
    MapView,
} from "expo"

import ShabbatCheck from "../components/ShabbatCheck";
import Styles from "../Styles";
import State from "../logic/State"

export default class SettingsScreen extends Component {
    render() {
        var s = State.user.getState();
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: s.location.coords.latitude,
                    longitude: s.location.coords.longitude,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.1,
                }}
                onPress={e => {
                    State.user.dispatch({
                        type: "SET_LOCATION",
                        location: {coords: {
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude,
                        }}
                    });
                    this.setState({});  // Re-renders Marker
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
        )
    }
}
