import {
	createStackNavigator,
	createAppContainer,
} from 'react-navigation';
import {
	styles,
	localization,
} from 'is-it-shabbat-core';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import InfoScreen from './screens/InfoScreen';

const { en: { translate } } = localization;

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
			title: translate.screens.settings,
			...NavigationOptions,
		},
	},
	Info: {
		screen: InfoScreen,
		navigationOptions: {
			title: translate.screens.info,
			...NavigationOptions,
		},
	},
}, {
	initialRouterName: 'Home',
}));
