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

import spacetime from './src/logic/SpaceTimeState';
import holidays from './src/logic/HolidayState';
import { getHolidaysAsync } from './src/api/hebcal';
import Router from './src/Router';

// State synchronizations
spacetime.user.subscribe(() => {
	// When location or time updates
	// and time is a different month or year,
	// update holidays list again
	const { now } = spacetime.user.getState();
	const { lastMonthRequested, lastYearRequested } = holidays.state.getState();
	if (now.month !== lastMonthRequested || now.year !== lastYearRequested) {
		getHolidaysAsync(now, 2, {}).then(hs => holidays.set.holidays(hs, now));
	}
});

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
		console.log('Location received');
		return location;
	};

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

	render() {
		const { isReady } = this.state;
		if (!isReady) {
			return (
				<AppLoading
					startAsync={async () => Promise.all([
						this.loadAssetsAsync(),
						this.getLocationAsync().then((location) => {
							// Initializing location
							spacetime.set.location(location);

							// Initializing time
							let init;
							init = DateTime.local();
							// // Done at (43, -71)
							// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 22, hour: 7, minute: 0, second: 0 });  //                        NOT_SHABBAT
							// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 24, hour: 14, minute: 0, second: 0 });  // Friday,               NOT_SHABBAT
							// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 24, hour: 19, minute: 18, second: 10 });  // Friday,             NOT_SHABBAT => CANDLELIGHTING
							// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 24, hour: 19, minute: 22, second: 30 });  // Friday,             CANDLELIGHTING
							// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 24, hour: 19, minute: 36, second: 10 });  // Friday,             CANDLELIGHTING => SHABBAT
							// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 24, hour: 21, minute: 0, second: 0 });  // Friday,               SHABBAT
							// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 24, hour: 23, minute: 59, second: 55 });  // Friday => Saturday, SHABBAT
							// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 25, hour: 14, minute: 0, second: 0 });  // Saturday,             SHABBAT
							// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 25, hour: 20, minute: 16, second: 32 });  // Saturday,           SHABBAT => NOT_SHABBAT
							// init = DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 25, hour: 21, minute: 0, second: 0 });  // Saturday,             NOT_SHABBAT
							spacetime.set.now(init);

							// Time is adjusted to match location
							const { now } = spacetime.user.getState();
							// TODO: if config for Israel is "infer", infer here and pass in as override
							return getHolidaysAsync(now, 2, {}).then(hs => holidays.set.holidays(hs, now));
						}),
					])
					}
					onFinish={() => {
						this.setState({ isReady: true });
					}}
					onError={console.warn}
				/>
			);
		}
		return isReady && (<Router />);
	}
}
