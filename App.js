import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';
import {
  Location,
  Permissions,
  Font,
  AppLoading
} from 'expo';

import Router from "./src/Router";

import ShabbatCheck from './src/components/ShabbatCheck';

import state from "./src/logic/State";
import Styles from "./src/Styles";

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends Component {

  state = {
    isReady: false,
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      // 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      // require('./assets/images/circle.jpg'),
    ]);

    const fontAssets = cacheFonts([
      {'FredokaOne': require('./assets/fonts/FredokaOne.ttf'),}
    ]);
    await Promise.all([...imageAssets, ...fontAssets]);
  }

  componentWillMount() {
    this._getLocationAsync().then(location => {
      console.log("Updating location state", location);
      state.user.dispatch({
        type: "SET_LOCATION",
        location,  // JS shorthand for location: location
      });
      console.log(state.user.getState());
    });
  }

  componentDidMount() {
  }

  _getLocationAsync = async () => {
    let {
      status
    } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return {
        // Default location
        coords: {
          latitude: 31.776875,
          longitude: 35.233673
        }

      }
    } else {
      let location = await Location.getCurrentPositionAsync({});
      console.log("Location received", location);
      return location;
    }
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }
    return this.state.isReady && (<Router />);
  }
}
