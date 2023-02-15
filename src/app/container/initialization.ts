import '../l10n';

import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
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

const loadAssetsAsync = async () => Promise.all([
	Asset.loadAsync(require('../screens/ShareIcon.png')),
	Asset.loadAsync(require('../screens/GearIcon.png')),
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

	loadHolidays();
}

export async function loadHolidays() {
	const now = getTime();
	getHolidays(now, 6, store.getState().holiday.options)(store.dispatch);
}

export default async () => {
	await loadAssetsAsync();

	const locationString = await AsyncStorage.getItem("location");
	if (locationString) {
		const location = JSON.parse(locationString);
		store.dispatch(setLocation(location));
		updateLocationAndHolidays();
		return;
	}
	await updateLocationAndHolidays();
};
