import React, {
    Component
} from 'react';
import {
    Text,
    View
} from 'react-native';

import CountDown from '../components/Countdown';

import state from "../State";

import Day from "../DayMath";

import Styles from "../Styles";

export default class ShabbatCheck extends Component {

    componentDidMount() {
        state.user.subscribe(() => {
            this.setState(state.user.getState());
        });
    }

    render() {
        console.log("Rendering")
        var s = state.user.getState();
        if (!s.location) {
            return null;
        }
        console.log("Doing day math")
        console.log("Now", s.now)
        var d = Day.data(s.now, s.location.coords.latitude, s.location.coords.longitude);
        // Is it Shabbat right now?
        console.log("Sat < sunset", s.now)
        var shabbat = (
            s.now.getDay() == Day.ofWeek.Saturday && // It's Saturday
            s.now < d.sunset // before the sun has fully set
        ) || (
            s.now.getDay() == Day.ofWeek.Friday && // It's Friday
            s.now > d.sunsetStart // after the sun starts setting
        );
        return !!s.location && (
        <View style = {[Styles.container]}>
            <Text style = {[Styles.title, Styles.center]} >
                {shabbat ? "Yes!" : "No..."}
            </Text>
            {
                !shabbat && <CountDown endDate = {
                    // Next Friday at Sundown
                    Day.data(
                        Day.nextOfWeek(s.now, Day.ofWeek.Friday),
                        s.location.coords.latitude,
                        s.location.coords.longitude
                    ).sunsetStart
                }
                startDate = {
                    s.now
                }
                style = {
                    [Styles.subtitle, Styles.center]
                }
                />
            }
            <View style={{height: 275}}/>
            {/* < Text style = {
                Styles.subtitle
            } >
                Sunset tonight {s.now < d.sunset ? "is" : "was"} {d.sunset.toLocaleTimeString()}
            </Text> */}
        </View>
        );
    }
}
