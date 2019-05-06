import {
	createStackNavigator,
	createAppContainer,
} from 'react-navigation';
import i18n from 'i18n-js';

import {
	styles,
} from 'is-it-shabbat-core';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import OmerScreen from './screens/OmerScreen';

const NavigationOptions = {
	headerTintColor: '#ffffff',
	headerStyle: {
		backgroundColor: styles.colors.background,
	},
};

export default createAppContainer(createStackNavigator({
	// Name the screen
	Home: {
		screen: HomeScreen,
		navigationOptions: {
			header: null,
		},
	},
	Settings: {
		screen: SettingsScreen,
		navigationOptions: {
			title: i18n.t('screens.settings'),
			...NavigationOptions,
		},
	},
	Omer: {
		screen: OmerScreen,
		navigationOptions: {
			title: 'Omer',
			...NavigationOptions,
		},
	},
}, {
	initialRouterName: 'Home',
}));
