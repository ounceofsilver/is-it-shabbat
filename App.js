import React, { Component } from 'react';
import {
	Image,
	Asset,
} from 'react-native';
import {
	Location,
	Permissions,
	Font,
	AppLoading,
} from 'expo';

import { DateTime } from 'luxon';

import state from './src/logic/State';
import Router from './src/Router';

function cacheFonts(fonts) {
	return fonts.map(font => Font.loadAsync(font));
}

function cacheImages(images) {
	return images.map((image) => {
		if (typeof image === 'string') {
			return Image.prefetch(image);
		}
		return Asset.fromModule(image).downloadAsync();
	});
}

export default class App extends Component {
	async loadAssetsAsync() {
		const imageAssets = cacheImages([
			// 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
			// require('./assets/images/circle.jpg'),
		]);

		const fontAssets = cacheFonts([
			{
				FredokaOne: require('./assets/fonts/FredokaOne.ttf'),
				fa: require('@expo/vector-icons/fonts/FontAwesome.ttf'),
			},
		]);
		return Promise.all([...imageAssets, ...fontAssets]);
	}

	state = {
		isReady: false,
	};

	getLocationAsync = async () => {
		const {
			status,
		} = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			return {
				// Default location
				coords: {
					latitude: 31.776875,
					longitude: 35.233673,
				},

			};
		}
		const location = await Location.getCurrentPositionAsync({});
		console.log('Location received:', location.coords.latitude, location.coords.longitude);
		return location;
	};

	render() {
		const { isReady } = this.state;
		if (!isReady) {
			return (
				<AppLoading
					startAsync={async () => {
						return await Promise.all([
							this.loadAssetsAsync(),
							this.getLocationAsync().then(location => {
								state.set.location(location);
							}),
						]);
					}}
					onFinish={() => {
						let init;
						init = DateTime.local()
						// // Done at (43, -71)
						// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 22, hour: 7, minute: 0, second: 0 })  //                        NOT_SHABBAT
						// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 24, hour: 14, minute: 0, second: 0 })  // Friday,               NOT_SHABBAT
						// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 24, hour: 19, minute: 18, second: 10 })  // Friday,             NOT_SHABBAT => CANDLELIGHTING
						// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 24, hour: 19, minute: 22, second: 30 })  // Friday,             CANDLELIGHTING
						// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 24, hour: 19, minute: 36, second: 10 })  // Friday,             CANDLELIGHTING => SHABBAT
						// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 24, hour: 21, minute: 0, second: 0 })  // Friday,               SHABBAT
						// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 24, hour: 23, minute: 59, second: 55 })  // Friday => Saturday, SHABBAT
						// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 25, hour: 14, minute: 0, second: 0 })  // Saturday,             SHABBAT
						// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 25, hour: 20, minute: 16, second: 32 })  // Saturday,           SHABBAT => NOT_SHABBAT
						// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 25, hour: 21, minute: 0, second: 0 })  // Saturday,             NOT_SHABBAT
						state.set.now(init);

						this.setState({ isReady: true });
					}}
					onError={console.warn}
				/>
			);
		}
		console.log('Loading App');
		return isReady && (<Router />);
	}
}
