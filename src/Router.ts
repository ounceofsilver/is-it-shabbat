import i18n from 'i18n-js';
import { styles } from 'is-it-shabbat-core';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import OmerScreen from './screens/OmerScreen';
import SettingsScreen from './screens/SettingsScreen';

const NavigationOptions = {
	headerStyle: {
		backgroundColor: styles.colors.background,
	},
	headerTintColor: '#ffffff',
};

export default createAppContainer(createStackNavigator({
	// Name the screen
	Home: {
		navigationOptions: {
			header: null,
		},
		screen: HomeScreen,
	},
	Omer: {
		navigationOptions: {
			title: 'Omer',
			...NavigationOptions,
		},
		screen: OmerScreen,
	},
	Settings: {
		navigationOptions: {
			title: i18n.t('screens.settings'),
			...NavigationOptions,
		},
		screen: SettingsScreen,
	},
},                                                     {
	initialRouterName: 'Home',
}));
