import React, {
    Component
} from 'react';
import {
    Text,
    View
} from 'react-native';
import {
    Location,
    Permissions
} from 'expo';
import SunCalc from 'suncalc';

import CountDown from '../components/Countdown';
import Styles from "../Styles";


export default class ShabbatCheck extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: null,
        };
        this.readyToRender = false;
        this._getLocationAsync().then(() => {
            this.readyToRender = true;
            this.setState(this.tick()); // Induces render
            setInterval(() => {
                this.setState(this.tick());
            }, 60000);
        });
    }

    shouldComponentUpdate() {
        return this.readyToRender;
    }

    render() {
        return this.readyToRender && (
        <View style = {[Styles.container]}>
            <Text style = {[Styles.title, Styles.center]} >
                {this.state.shabbat ? "Yes!" : "No..."}
            </Text>
            {
                !this.state.shabbat && <CountDown endDate={this.state.sundownFriday} style = {[Styles.subtitle, Styles.center]}/>
            }
            <View style={{height: 275}}/>
            < Text style = {
                Styles.subtitle
            } >
                Sunset tonight {this.state.date < this.state.sunset ? "is" : "was"} {this.state.sunset.toLocaleTimeString()}
            </Text>
        </View>
        );
    }

    dayData(day) {
        return this.state.location && SunCalc.getTimes(
            day,
            this.state.location.coords.latitude,
            this.state.location.coords.longitude
        );
    }

    // Request and get location
    _getLocationAsync = async () => {
        console.log("Getting location", this.state);
        let {
            status
        } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.state = {
                location: 'Permission to access location was denied',
            };
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({
            location: location,
        });
        console.log("Location set", this.state);
    };


    tick() {
        var date = new Date();
        // var date = new Date("8/25/2018 5:30:00");
        // console.log("Testing");

        var sunset = this.dayData(date).sunset;
        // console.log("Render: now:", date);

        var nextFriday = new Date(date.getTime()); // copies current time
        var dayOffset = (7 + 5 - date.getDay()) % 7
        if (dayOffset == 6) {
            dayOffset = -1;
        }
        nextFriday.setDate(date.getDate() + dayOffset);
        var sundownFriday = this.dayData(nextFriday).sunsetStart;
        // console.log("Render: nextFriday:", nextFriday);

        var nextSaturday = new Date(date.getTime()); // copies current time
        var dayOffset = (7 + 6 - date.getDay()) % 7
        nextSaturday.setDate(date.getDate() + dayOffset);
        var sunsetSaturday = this.dayData(nextSaturday).sunset;

        return {
            date: date,
            sunset: sunset,
            shabbat: date > sundownFriday && date < sunsetSaturday,
            sundownFriday: sundownFriday,
            sunsetSaturday: sunsetSaturday,
        };
    }
}
