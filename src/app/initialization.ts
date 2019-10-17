import './l10n';

import { FontAwesome } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Image } from 'react-native';

import { setLocation } from '../core/store/config';
import { getHolidays } from '../core/store/holiday/actions';
import getLocation from './features/location/getLocation';
import store from './store';
import { getTime } from './time';

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
		// require('../../assets/images/circle.jpg'),
	]),
	...cacheFonts([
		{
			FredokaOne: require('../../assets/fonts/FredokaOne.ttf'),
		},
		FontAwesome.font,
	]),
]);

//
// Initialization
//
export default async () => {
	await Promise.all([
		loadAssetsAsync(),
		getLocation().then((location) => {
			store.dispatch(setLocation(location));

			const now = getTime();
			getHolidays(now, 2, store.getState().holiday.options)(store.dispatch);
		}),
	]);
};
