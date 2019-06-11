import './l10n';

import { FontAwesome } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { action, state, utilities } from 'is-it-shabbat-core';
import { Image } from 'react-native';

import getLocation from './components/location/getLocation';
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
		// require('./assets/images/circle.jpg'),
	]),
	...cacheFonts([
		{
			FredokaOne: require('../assets/fonts/FredokaOne.ttf'),
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
			state.dispatch(action.initialize(
				getTime(),
				location,
			));
		}),
	]);
};
