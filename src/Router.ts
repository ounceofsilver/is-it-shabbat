import i18n from 'i18n-js';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { colors } from './Styles';

import HomeScreen from './screens/HomeScreen';
import OmerScreen from './screens/OmerScreen';
import SettingsScreen from './screens/SettingsScreen';

const NavigationOptions = {
	headerStyle: {
		backgroundColor: colors.background,
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
	initialRouteName: 'Home',
}));
