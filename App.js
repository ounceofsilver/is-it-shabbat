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
      {
        'FredokaOne': require('./assets/fonts/FredokaOne.ttf'),
        ionicons: require("@expo/vector-icons/fonts/FontAwesome.ttf")
      }
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
          onFinish={() => {
            state.user.dispatch({
              type: "SET_NOW",
              now: new Date(),
              // now: new Date("8/22/2018 07:00:00"),  //                     NOT_SHABBAT
              // now: new Date("8/24/2018 14:00:00"),  // Friday,             NOT_SHABBAT
              // now: new Date("8/24/2018 19:16:32"),  // Friday,             NOT_SHABBAT => CANDLELIGHTING
              // now: new Date("8/24/2018 19:22:30"),  // Friday,             CANDLELIGHTING
              // now: new Date("8/24/2018 19:34:30"),  // Friday,             CANDLELIGHTING => SHABBAT
              // now: new Date("8/24/2018 21:00:00"),  // Friday,             SHABBAT
              // now: new Date("8/24/2018 23:59:55"),  // Friday => Saturday, SHABBAT
              // now: new Date("8/25/2018 14:00:00"),  // Saturday,           SHABBAT
              // now: new Date("8/25/2018 20:14:55"),  // Saturday,           SHABBAT => NOT_SHABBAT
              // now: new Date("8/25/2018 21:00:00"),  // Saturday,           NOT_SHABBAT
            });
            // console.log((new Date("8/24/2018 19:16:36")) - (new Date("8/24/2018 19:34:36")));

            this.setState({ isReady: true });
          }}
          onError={console.warn}
        />
      )
    }
    return this.state.isReady && (<Router />);
  }
}
