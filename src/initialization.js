import {
	Image,
	Asset,
} from 'react-native';
import {
	Font,
	Localization,
} from 'expo';

import i18n from 'i18n-js';

import {
	utilities,
	action,
	state,
} from 'is-it-shabbat-core';

import getLocationAsync from './utilities/getLocation';

const { DateTime } = utilities;

//
// Assets loading
//
const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));
const cacheImages = images => images.map((image) => {
	if (typeof image === 'string') {
		return Image.prefetch(image);
	}
	return Asset.fromModule(image).downloadAsync();
});

const loadAssetsAsync = async () => Promise.all([
	...cacheImages([
		// 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
		// require('./assets/images/circle.jpg'),
	]),
	...cacheFonts([
		{
			FredokaOne: require('../assets/fonts/FredokaOne.ttf'), // eslint-disable-line
			fa: require('@expo/vector-icons/fonts/FontAwesome.ttf'), // eslint-disable-line
		},
	]),
]);

//
// Initialization
//
export default async () => Promise.all([
	Promise.resolve(() => {
		i18n.locale = Localization.locale;
	}),
	loadAssetsAsync(),
	getLocationAsync().then((location) => {
		const act = action.initialize(
			DateTime.local(),
			//
			//
			// Simulate different times
			//
			//

			// Done at (43, -71)
			//
			// 2 weeks before Rosh Hashana
			//

			// Weekday
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 22, hour: 7, minute: 0, second: 0 }),

			// Friday, pre-candlelighting
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 24, hour: 14, minute: 0, second: 0 }),

			// Candlelighting Crossover
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 24, hour: 19, minute: 18, second: 10 }),

			// Candlelighting
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 24, hour: 19, minute: 22, second: 30 }),

			// Shabbat crossover
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 24, hour: 19, minute: 36, second: 10 }),

			// Friday Shabbat
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 24, hour: 21, minute: 0, second: 0 }),

			// Friday Saturday crossover
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 24, hour: 23, minute: 59, second: 55 }),

			// Saturday Shabbat
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 25, hour: 14, minute: 0, second: 0 }),

			// Havdala
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 25, hour: 20, minute: 16, second: 32 }),

			// Saturday Not Shabbat
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 8, day: 25, hour: 21, minute: 0, second: 0 }),

			//
			// Hannukah
			//

			// Holiday crossover
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: 'America/New_York', year: 2018, month: 12, day: 2, hour: 16, minute: 11, second: 44 }),
			location,
		);
		state.dispatch(act);
	}),
]);
