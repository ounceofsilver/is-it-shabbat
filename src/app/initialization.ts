import './l10n';

import { FontAwesome } from '@expo/vector-icons';
import { Notifications, Permissions } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import i18n from 'i18n-js';
import { DateTime } from 'luxon';
import { Image } from 'react-native';

import { getShabbatState } from '../core/store/get';
import { setLocation } from '../core/store/use/config';
import { getHolidays } from '../core/store/use/holiday/actions';
import getLocation from './components/location/getLocation';
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

async function getNotificationPermissions() {
	const { status } = await Permissions.getAsync(
		Permissions.NOTIFICATIONS,
	);
	if (status !== 'granted') {
		await Permissions.askAsync(
			Permissions.NOTIFICATIONS,
		);
	}
}

//
// Initialization
//
export default async () => {
	const loadAssetsPromise = loadAssetsAsync();
	const getLocationPromise = getLocation();
	const getNotificationPermissionsPromise = getNotificationPermissions();
	// const cancelAllScheduledNotificationsPromise =
	// Notifications.cancelAllScheduledNotificationsAsync();

	// location initialization logic
	const location = await getLocationPromise;
	store.dispatch(setLocation(location));
	const now = getTime();
	getHolidays(now, 2, store.getState().holiday.options)(store.dispatch);

	// notification logic
	await Promise.all([
		getNotificationPermissionsPromise,
		// cancelAllScheduledNotificationsPromise,
	]);
	const shabbat = getShabbatState(store.getState());
	await Notifications.scheduleLocalNotificationAsync({
		title: i18n.t(`notification.${shabbat.period}.title`),
		body: i18n.t(`notification.${shabbat.period}.body`),
	},                                                 {
		// time: shabbat.countDownTo.toMillis(),
		// TODO(james): NOMERGE
		time: DateTime.local().plus({ seconds: 15 }).toMillis(),
	});

	await Promise.all([
		loadAssetsPromise,
	]);
};
