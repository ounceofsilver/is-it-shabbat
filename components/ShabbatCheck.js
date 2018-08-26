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

    is = {
        SHABBAT: "SHABBAT",
        NOT_SHABBAT: "NOT_SHABBAT",
        CANDLELIGHTING: "CANDLELIGHTING",
    }

    message = {
        SHABBAT: "Yes!",
        NOT_SHABBAT: "No...",
        CANDLELIGHTING: "Almost..."
    }

    endEventName = {
        SHABBAT: "Shabbat ends",
        NOT_SHABBAT: "candle lighting",
        CANDLELIGHTING: "Shabbat begins",
    }

    fridaySunset(userState) {
        return Day.data(
            Day.nextOfWeek(userState.now, Day.ofWeek.Friday),
            userState.location.coords.latitude,
            userState.location.coords.longitude
        ).sunset;
    }

    candleLighting(userState) {
        // https://judaism.stackexchange.com/questions/4334/calculating-shabbat-candle-lighting-time
        // 18 minutes *
        // 60 sec/min * [1080]
        // 1000 ms/sec = 1080000
        return new Date(this.fridaySunset(userState).getTime() - 1080000);  // 18 minutes
    }

    havdala(userState) {
        var sunsetSaturday = Day.data(
            Day.nextOfWeek(userState.now, Day.ofWeek.Saturday),
            userState.location.coords.latitude,
            userState.location.coords.longitude
        ).sunset;
        // https://www.hebcal.com/home/96/what-is-havdalah-or-when-does-shabbat-end
        // You can always end Shabbat later
        // 42 minutes *
        // 60 sec/min * [2520]
        // 1000 ms/sec = 2520000
        return new Date(sunsetSaturday.getTime() + 2520000)

    }

    isItShabbat(userState) {
        // TODO: make this core-code testable.
        var now = userState.now;

        // SATURDAY
        var countDownTo;
        var period;
        if (now.getDay() == Day.ofWeek.Saturday) {
            var havdala = this.havdala(userState);
            if (now < havdala) {
                period = this.is.SHABBAT;
                countDownTo = havdala;
            } else {
                period = this.is.NOT_SHABBAT;
                countDownTo = this.candleLighting(userState);
            }

        // FRIDAY
        } else if (now.getDay() == Day.ofWeek.Friday) {
            var fridaySunset = this.fridaySunset(userState);
            var candleLighting = this.candleLighting(userState);
            if (now > candleLighting) {
                if (now < fridaySunset) {
                    period = this.is.CANDLELIGHTING;
                    countDownTo = fridaySunset;
                } else {
                    period = this.is.SHABBAT;
                    countDownTo = this.havdala(userState);
                }
            } else {
                period = this.is.NOT_SHABBAT;
                countDownTo = candleLighting;
            }

        // OTHER DAYS
        } else {
            period = this.is.NOT_SHABBAT;
            countDownTo = this.candleLighting(userState);
        }

        return {
            period: period,
            countDownTo: countDownTo
        }
    }

    render() {
        console.log("Rendering")
        var s = state.user.getState();
        if (!s.location) {
            return null;
        }
        var time = this.isItShabbat(s);

        console.log("see countdown", time.countDownTo);

        return (
        <View style = {[Styles.container]}>
            <Text style = {[Styles.title, Styles.center]} >
                    {this.message[time.period]}
            </Text>
            <CountDown
                endDate = {
                    time.countDownTo
                }
                startDate = {
                    s.now
                }
                callback = {
                    (now) => {
                        console.log(time.period + " FINISHED", now);
                        state.user.dispatch({
                            type: "SET_NOW",
                            now: now,
                        })
                    }
                }
                style = {
                    [Styles.subtitle, Styles.center]
                }
            />
            <Text>until {this.endEventName[time.period]}</Text>
        </View>
        );
    }
}
