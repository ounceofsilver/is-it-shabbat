import React, { Component } from 'react';
import {
    ScrollView,
    View
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import ShabbatCheck from "../components/ShabbatCheck";
import state from "../logic/State";
import Styles from "../Styles";

export default class HomeScreen extends Component {
    _refresh() {
        state.user.dispatch({
            type: "SET_NOW",
            now: new Date(),
        })
    }

    render() {
        return (
            <View style={{height: "100%"}}>
                <ScrollView
                    style={{
                        backgroundColor: Styles.colors.background
                    }}
                    // refreshControl={<RefreshControl
                    //     refreshing={false}  // Refresh is fast enough and isn't all that asynchronous.
                    //     onRefresh={this._refresh}
                    // />}
            >
                    <ShabbatCheck
                        style={[Styles.container, { height: 400 }]}
                    />
                </ScrollView>
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        paddingVertical: 10,
                        paddingHorizontal: 15,

                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <View>
                        <FontAwesome
                            name="map-marker" size={24} color={Styles.colors.textSubtle}
                            onPress={() => this.props.navigation.navigate("Settings")}
                        />
                    </View>
                    <View>
                        <FontAwesome
                            name="info-circle" size={24} color={Styles.colors.textSubtle}
                            onPress={() => this.props.navigation.navigate("Info")}
                        />
                    </View>

                </View>
            </View>

        )
    }
}
