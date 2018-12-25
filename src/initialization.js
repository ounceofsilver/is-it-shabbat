import {
	Image,
	Asset,
} from 'react-native';
import {
	Location,
	Permissions,
	Font,
	// Localization,
} from 'expo';

// import i18n from 'i18next';
// import { reactI18nextModule } from 'react-i18next';

import { state, utilities } from 'is-it-shabbat-core';

const { spacetime, updateHolidays } = state;
const { DateTime } = utilities;

//
// i18n
//
// const languageDetector = {
// 	type: 'languageDetector',
// 	async: true, // flags below detection to be async
// 	detect: callback => Localization.getLocalizationAsync()
// 		.then(({ locale }) => callback(locale)),
// 	init: () => {},
// 	cacheUserLanguage: () => {},
// };
//
// const initializeI18n = () => i18n
// 	.use(languageDetector)
// 	.use(reactI18nextModule)
// 	.init({
// 		fallbackLng: 'en',
// 		resources: localization,
// 		interpolation: {
// 			escapeValue: false,
// 		},
// 	});

//
// Location
//
const getLocationAsync = async () => {
	const { status } = await Permissions.askAsync(Permissions.LOCATION);
	if (status !== 'granted') {
		return {
			// TODO(james.fulford): get location by IP
			coords: {
				latitude: 31.776875,
				longitude: 35.233673,
			},
		};
	}
	const location = await Location.getCurrentPositionAsync({});
	return location;
};

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
	// initializeI18n(),
	loadAssetsAsync(),
	getLocationAsync().then((location) => {
		spacetime.action.initialize(
			DateTime.local(),
			// // Done at (43, -71)
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 22, hour: 7, minute: 0, second: 0 }),
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 24, hour: 14, minute: 0, second: 0 }),
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 24, hour: 19, minute: 18, second: 10 }),
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 24, hour: 19, minute: 22, second: 30 }),
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 24, hour: 19, minute: 36, second: 10 }),
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 24, hour: 21, minute: 0, second: 0 }),
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 24, hour: 23, minute: 59, second: 55 }),
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 25, hour: 14, minute: 0, second: 0 }),
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 25, hour: 20, minute: 16, second: 32 }),
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 8, day: 25, hour: 21, minute: 0, second: 0 }),
			// eslint-disable-next-line
			// DateTime.fromObject({ zone: "America/New_York", year: 2018, month: 12, day: 2, hour: 15, minute: 0, second: 0 }),
			location,
		);
		updateHolidays(true);
	}),
]);
