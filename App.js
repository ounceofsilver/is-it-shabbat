import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';

import ShabbatCheck from './components/ShabbatCheck';
import Styles from "./Styles"

export default class App extends Component {

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
