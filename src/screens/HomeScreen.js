import React, { Component } from 'react';
import {
    ScrollView,
    Button,
    Text,
    View
} from 'react-native';

import ShabbatCheck from "../components/ShabbatCheck";
import Styles from "../Styles";

export default class HomeScreen extends Component {
    render() {
        return (
            <ScrollView style={{ backgroundColor: Styles.colors.background }}>
                <ShabbatCheck
                    style={[Styles.container, { height: 400 }]}
                />
                {/* <Button onPress={() => this.props.navigation.navigate("Settings")} title="Change Location"/> */}

                {/* <Text
        style={{ ...Styles.title, color: Styles.colors.textSubtle, fontSize: 100}}
        suppressHighlighting={true}
    >שבת</Text> */}

                {/* <Text style={Styles.bottomHeading}>
        Sunset tonight {this.state.date < this.state.sunset ? "is" : "was"} {this.state.sunset.toLocaleTimeString()}
    </Text> */}
                <Button
                    onPress={() => this.props.navigation.navigate("Settings")} title="Change Location"
                />
            </ScrollView>
        )
    }
}
