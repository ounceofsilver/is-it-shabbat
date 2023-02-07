import '../l10n';

import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { setLocation } from '../../core/store/config';
import { getHolidays } from '../../core/store/holiday';
import getLocation from '../features/location/getLocation';
import { getTime } from '../time';
import store from './store';

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
			FredokaOne: require('../../../assets/fonts/FredokaOne.ttf'),
		},
	]),
]);

//
// Initialization
//

store.subscribe(() => {
	const location = store.getState().config.location;
	if (location) {
		console.info("Saving location to localStorage...", location);
		AsyncStorage.setItem("location", JSON.stringify(location)).catch(console.error);
	}
});

async function updateLocationAndHolidays() {
	const location = await getLocation();

	store.dispatch(setLocation(location));

	const now = getTime();
	getHolidays(now, 6, store.getState().holiday.options)(store.dispatch);
}

export default async () => {
	loadAssetsAsync();
	const locationString = await AsyncStorage.getItem("location");
	if (locationString) {
		const location = JSON.parse(locationString);
		store.dispatch(setLocation(location));
		updateLocationAndHolidays();
		return;
	}
	await updateLocationAndHolidays();
};
