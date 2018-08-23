import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import {
  Location,
  Permissions
} from 'expo';

import ShabbatCheck from './components/ShabbatCheck';

import state from "./State";
import Styles from "./Styles";

export default class App extends Component {

  componentWillMount() {
    this._getLocationAsync().then(location => {
      console.log("Updating location state", location);
      state.user.dispatch({
        type: "SET_LOCATION",
        location: location, //location... that's three
      });
      console.log(state.user.getState());
    });
  }

  _getLocationAsync = async () => {
    let {
      status
    } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return {
        // Default location
      }
    } else {
      let location = await Location.getCurrentPositionAsync({});
      console.log("Location received", location);
      return location;
    }
  };

  render() {
    return (
      <ScrollView>
        <View style = {{height: 150}}/>
          <ShabbatCheck/>
          {/* <Text style={Styles.bottomHeading}>
            Sunset tonight {this.state.date < this.state.sunset ? "is" : "was"} {this.state.sunset.toLocaleTimeString()}
          </Text> */}
      </ScrollView>
    );
  }
}
