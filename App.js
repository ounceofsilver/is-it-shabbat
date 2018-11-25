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
	static async loadAssetsAsync() {
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
		await Promise.all([...imageAssets, ...fontAssets]);
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
		console.log('Location received', location.coords.latitude, location.coords.longitude);
		return location;
	};

	render() {
		const { isReady } = this.state;
		if (!isReady) {
			return (
				<AppLoading
					startAsync={async () => {
						this.loadAssetsAsync();
						console.log('ASYNC APPLOADING LOCATION APP');
						this.getLocationAsync().then((location) => {
							state.user.dispatch({
								type: 'SET_LOCATION',
								location,
							});
						});
					}}
					onFinish={() => {
						state.user.dispatch({
							type: 'SET_NOW',
							now: DateTime.local(),
							// now: new Date("8/22/2018 07:00:00"),  //                 NOT_SHABBAT
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
			);
		}
		return isReady;
		// return isReady && (<Router />);
	}
}
