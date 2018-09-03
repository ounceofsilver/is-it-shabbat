import React, {
    Component
} from 'react';
import {
    Text,
    View
} from 'react-native';

import CountDown from '../components/Countdown';

import state from "../logic/State";

import Shabbat from "../logic/Shabbat";

import Styles from "../Styles";

export default class ShabbatCheck extends Component {

    componentDidMount() {
        state.user.subscribe(() => {
            this.setState(state.user.getState());
        });
    }

    message = {
        [Shabbat.is.SHABBAT]: "Yes!",
        [Shabbat.is.NOT_SHABBAT]: "No...",
        [Shabbat.is.CANDLELIGHTING]: "Almost..."
    }

    endEventName = {
        [Shabbat.is.SHABBAT]: "Shabbat ends",
        [Shabbat.is.NOT_SHABBAT]: "candle lighting",
        [Shabbat.is.CANDLELIGHTING]: "Shabbat begins",
    }

    render() {
        console.log("Rendering")
        var s = state.user.getState();
        if (!s.location) {
            return null;
        }
        var time = Shabbat.isItShabbat(
            s.now,
            s.location.coords.latitude,
            s.location.coords.longitude
        );

        return (
        <View style={this.props.style}>
            <Text style={[Styles.title, Styles.center]} >
                    {this.message[time.period]}
            </Text>
            <CountDown
                style={[Styles.subtitle, Styles.center]}
                endDate = {time.countDownTo}
                startDate = {s.now}
                callback = {state.set.now}
            />
            <Text style={
                [Styles.subtitle, Styles.center]
            }>until {this.endEventName[time.period]}</Text>
        </View>
        );
    }
}
