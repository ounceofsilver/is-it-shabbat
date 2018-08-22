/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
  Constants,
  Location,
  Permissions
} from 'expo';
import CountDown from './components/Countdown';
import SunCalc from 'suncalc';


export default class App extends Component {
  state = {
    location: null,
  };
  readyToRender = false;

  shouldComponentUpdate() {
    return this.readyToRender;
  }

  constructor(props) {
    super(props);
    this._getLocationAsync().then(() => {
      this.readyToRender = true;
      this.setState(this.tick());  // Induces render
      setInterval(() => {
        this.setState(this.tick());
      }, 60000);
    });
  }

  render() {
    return this.readyToRender && (
      <View style={styles.container}>
          < Text style = {styles.titleCenter} >
            {this.state.shabbat ? "Yes!" : "No..."}
          </Text>
          {
            !this.state.shabbat && <CountDown endDate={this.state.sundownFriday} styles={styles.subtitleCenter}/>
          }
          <Text style={styles.bottomHeading}>
            Sunset tonight {this.state.date < this.state.sunset ? "is" : "was"} {this.state.sunset.toLocaleTimeString()}
          </Text>
      </View>
    );
  }

  tick() {
    var date = new Date();
    // var date = new Date("8/25/2018 5:30:00");
    // console.log("Testing");

    var sunset = this.dayData(date).sunset;
    // console.log("Render: now:", date);

    var nextFriday = new Date(date.getTime());  // copies current time
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

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titleCenter: {
    fontSize: 30,
    textAlign: 'center',
    margin: 15,
  },
  subtitleCenter: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333333',
  },
  bottomHeading: {
    fontSize: 20,
    textAlign: 'center'
  }
});
